<?php

declare(strict_types=1);

namespace App\Domain\Task\Enum;

use InvalidArgumentException;

enum TaskStatus: string
{
    case TODO = 'todo';
    case IN_PROGRESS = 'in_progress';
    case DONE = 'done';

    public static function fromString(string $status): self
    {
        $normalized = strtolower(trim($status));

        return match ($normalized) {
            self::TODO->value => self::TODO,
            self::IN_PROGRESS->value, 'in-progress' => self::IN_PROGRESS,
            self::DONE->value => self::DONE,
            default => throw new InvalidArgumentException('Invalid task status.'),
        };
    }
}
