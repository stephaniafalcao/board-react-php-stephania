TRUNCATE TABLE task, board RESTART IDENTITY CASCADE;

INSERT INTO board (
    name,
    description,
    theme_color,
    icon,
    created_at,
    updated_at
) VALUES
(
    'Marketing Launch',
    'Q4 Campaign execution and asset tracking.',
    '#0052CC',
    'megaphone',
    CURRENT_TIMESTAMP,
    NULL
),
(
    'Product Roadmap',
    'Strategic planning for version 2.0 release.',
    '#6366F1',
    'map',
    CURRENT_TIMESTAMP,
    NULL
),
(
    'Customer Feedback',
    'User interviews and feature requests backlog.',
    '#F59E0B',
    'message-square',
    CURRENT_TIMESTAMP,
    NULL
);

INSERT INTO task (
    board_id,
    title,
    description,
    status,
    position,
    created_at,
    updated_at
)
SELECT
    b.id,
    'Define campaign audience',
    'Segment target users for the campaign.',
    'done',
    1,
    CURRENT_TIMESTAMP,
    NULL
FROM board b
WHERE b.name = 'Marketing Launch';

INSERT INTO task (
    board_id,
    title,
    description,
    status,
    position,
    created_at,
    updated_at
)
SELECT
    b.id,
    'Prepare email copy',
    'Write launch email sequence.',
    'todo',
    2,
    CURRENT_TIMESTAMP,
    NULL
FROM board b
WHERE b.name = 'Marketing Launch';

INSERT INTO task (
    board_id,
    title,
    description,
    status,
    position,
    created_at,
    updated_at
)
SELECT
    b.id,
    'Prioritize features',
    'Define MVP and future scope.',
    'in_progress',
    1,
    CURRENT_TIMESTAMP,
    NULL
FROM board b
WHERE b.name = 'Product Roadmap';