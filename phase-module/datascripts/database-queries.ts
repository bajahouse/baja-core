import { std } from "wow/wotlk";

std.SQL.Databases.world_dest.writeEarly(`
    DROP TABLE IF EXISTS \`farming_crops\`;
    CREATE TABLE \`farming_crops\` (
        \`id\` INT(10) NOT NULL,
        \`stage0go\` INT(10) NOT NULL,
        \`stage1go\` INT(10) NOT NULL,
        \`stage1growth\` INT(10) NOT NULL,
        \`harvest_reward\` INT(10) NOT NULL,
        \`min_count\` INT(10) NOT NULL,
        \`max_count\` INT(10) NOT NULL,
        PRIMARY KEY(\`id\`)
    );
`)