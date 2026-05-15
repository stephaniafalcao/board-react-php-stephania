<?php

declare(strict_types=1);

namespace App\Application\Task\DTO;

use InvalidArgumentException;

final readonly class UpdateTaskStatusDTO
{
    public function __construct(
        public string $taskId,
        public string $status
    ) {
        $this->validate();
    }

    public static function fromArray(array $data): self
    {
        $taskIdValue = $data['taskId'] ?? $data['id'] ?? '';
        $statusValue = $data['status'] ?? '';

        return new self(
            taskId: trim((string) $taskIdValue),
            status: strtolower(trim((string) $statusValue)),
        );
    }

    private function validate(): void
    {
        if ($this->taskId === '') {
            throw new InvalidArgumentException('Task id is required.');
        }

        if ($this->status === '') {
            throw new InvalidArgumentException('Task status is required.');
        }
    }
}
