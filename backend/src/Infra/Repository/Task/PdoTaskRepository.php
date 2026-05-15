<?php

declare(strict_types=1);

namespace App\Infra\Repository\Task;

use App\Domain\Task\Enum\TaskStatus;
use App\Domain\Task\Repository\TaskRepositoryInterface;
use PDO;

final class PdoTaskRepository implements TaskRepositoryInterface
{
    public function __construct(
        private readonly PDO $connection
    ) {}

    public function updateStatus(string $taskId, TaskStatus $newStatus): void
    {
        $sql = 'UPDATE task SET status = :status WHERE id = :id';

        $stmt = $this->connection->prepare($sql);

        $stmt->execute([
            'id' => $taskId,
            'status' => $newStatus->value,
        ]);
    }
}
