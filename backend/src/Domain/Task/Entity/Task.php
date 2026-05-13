<?php

declare(strict_types=1);

namespace App\Domain\Task\Entity;


final class Task
{
    public function __construct(
        private readonly ?int $id,
        private readonly int $boardId,
        private string $title,
        private ?string $description,
        private string $status,
        private int $position,
    ) {}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBoardId(): int
    {
        return $this->boardId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getPosition(): int
    {
        return $this->position;
    }
}
