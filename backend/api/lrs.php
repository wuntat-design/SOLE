<?php
/**
 * REST API Endpoint: xAPI LRS Analytics Statements
 * GET /api/lrs.php - Retrieve LRS xAPI statements
 * POST /api/lrs.php - Record new xAPI statement
 */

require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json; charset=utf-8');

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $stmt = $pdo->prepare("SELECT * FROM lrs_xapi_statements ORDER BY timestamp DESC LIMIT :limit");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'count' => count($data),
        'statements' => array_map(function($row) {
            return [
                'id' => $row['statement_uuid'],
                'timestamp' => $row['timestamp'],
                'actor' => [
                    'name' => $row['actor_name'],
                    'mbox' => 'mailto:' . $row['actor_email']
                ],
                'verb' => [
                    'id' => $row['verb_id'],
                    'display' => ['id-ID' => $row['verb_display']]
                ],
                'object' => [
                    'id' => $row['object_id'],
                    'definition' => ['name' => ['id-ID' => $row['object_name']]]
                ],
                'result' => [
                    'completion' => (bool)$row['result_completion']
                ]
            ];
        }, $data)
    ]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || empty($input['actor']) || empty($input['verb']) || empty($input['object'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid xAPI statement payload']);
        exit;
    }

    $uuid = $input['id'] ?? sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000, mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff));
    $actorName = $input['actor']['name'] ?? 'Pendidik Anonim';
    $actorEmail = str_replace('mailto:', '', $input['actor']['mbox'] ?? 'anonim@guru.belajar.id');
    $verbId = $input['verb']['id'] ?? '';
    $verbDisplay = $input['verb']['display']['id-ID'] ?? ($input['verb']['display']['en-US'] ?? 'action');
    $objectId = $input['object']['id'] ?? '';
    $objectName = $input['object']['definition']['name']['id-ID'] ?? ($input['object']['definition']['name']['en-US'] ?? 'Activity');
    $completion = isset($input['result']['completion']) ? ($input['result']['completion'] ? 1 : 0) : null;
    $rawJson = json_encode($input);

    $stmt = $pdo->prepare("
        INSERT INTO lrs_xapi_statements 
        (statement_uuid, actor_name, actor_email, verb_id, verb_display, object_id, object_name, result_completion, raw_statement_json, timestamp)
        VALUES (:uuid, :actorName, :actorEmail, :verbId, :verbDisplay, :objectId, :objectName, :completion, :rawJson, NOW())
    ");

    $stmt->execute([
        ':uuid' => $uuid,
        ':actorName' => $actorName,
        ':actorEmail' => $actorEmail,
        ':verbId' => $verbId,
        ':verbDisplay' => $verbDisplay,
        ':objectId' => $objectId,
        ':objectName' => $objectName,
        ':completion' => $completion,
        ':rawJson' => $rawJson
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'id' => $uuid, 'message' => 'xAPI Statement recorded successfully']);
    exit;
}
