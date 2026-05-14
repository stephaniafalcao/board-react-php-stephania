<?php

declare(strict_types=1);

namespace App\Application\Board\DTO;

use InvalidArgumentException;

final readonly class CreateBoardInputDTO
{
    private const ALLOWED_ICONS = [
        'megaphone',
        'map',
        'message',
        'message-square',
        'compass',
        'users',
        'rocket',
        'chart',
        'kanban',
        'bug',
        'palette',
    ];

    public function __construct(
        public string $name,
        public ?string $description,
        public string $themeColor,
        public string $icon,
    ) {
        $this->validate();
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name: trim((string) ($data['name'] ?? '')),
            description: isset($data['description']) && $data['description'] !== ''
                ? trim((string) $data['description'])
                : null,
            themeColor: strtoupper(trim((string) ($data['themeColor'] ?? ''))),
            icon: strtolower(trim((string) ($data['icon'] ?? ''))),
        );
    }

    private function validate(): void
    {
        if ($this->name === '') {
            throw new InvalidArgumentException('Board name is required.');
        }

        if (mb_strlen($this->name) > 100) {
            throw new InvalidArgumentException('Board name must have at most 100 characters.');
        }

        if ($this->themeColor === '') {
            throw new InvalidArgumentException('Theme color is required.');
        }

        if (!preg_match('/^#[A-F0-9]{6}$/', $this->themeColor)) {
            throw new InvalidArgumentException('Theme color must be a valid hex code.');
        }

        if ($this->icon === '') {
            throw new InvalidArgumentException('Board icon is required.');
        }

        if (!in_array($this->icon, self::ALLOWED_ICONS, true)) {
            throw new InvalidArgumentException('Board icon is invalid.');
        }
    }
}
