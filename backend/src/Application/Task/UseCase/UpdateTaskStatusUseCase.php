<?php

namespace App\Application\Task\UseCase;

use App\Application\Task\DTO\UpdateTaskStatusDTO;
use App\Domain\Task\Enum\TaskStatus;
use App\Domain\Task\Repository\TaskRepositoryInterface;

class UpdateTaskStatusUseCase
{
    public function __construct(
        private TaskRepositoryInterface $taskRepository
    ) {}

    public function execute(UpdateTaskStatusDTO $input): void
    {
        $newStatus = TaskStatus::fromString($input->status);

        $this->taskRepository->updateStatus($input->taskId, $newStatus);
    }
}
