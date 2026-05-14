<?php

declare(strict_types=1);

namespace App\Domain\Board\Entity;

use DateTimeImmutable;

final class Board
{
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private ?string $description,
        private string $themeColor,
        private string $icon,
        private readonly ?DateTimeImmutable $createdAt = null,
        private readonly ?DateTimeImmutable $updatedAt = null,
    ) {}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getThemeColor(): string
    {
        return $this->themeColor;
    }

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }
}
