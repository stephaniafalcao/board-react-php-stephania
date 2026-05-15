<?php

namespace App\Domain\Task\Repository;

use App\Domain\Task\Enum\TaskStatus;

interface TaskRepositoryInterface
{
    public function updateStatus(string $taskId, TaskStatus $newStatus): void;
}
