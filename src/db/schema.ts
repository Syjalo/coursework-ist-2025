import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const countriesTable = sqliteTable('country', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text({ length: 100 }).notNull(),
});

export const countryInsertSchema = createInsertSchema(countriesTable);
export const countrySelectSchema = createSelectSchema(countriesTable);

export const manufacturersTable = sqliteTable('manufacturer', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text({ length: 100 }).notNull(),
	country_id: int()
		.references(() => countriesTable.id)
		.notNull(),
});

export const manufacturerInsertSchema = createInsertSchema(manufacturersTable);
export const manufacturerSelectSchema = createSelectSchema(manufacturersTable);

export const robotsTable = sqliteTable('robot', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text({ length: 100 }).notNull(),
	manufacturer_id: int()
		.references(() => manufacturersTable.id)
		.notNull(),
	payload_capacity: int().notNull(),
	max_speed: int().notNull(),
});

export const robotInsertSchema = createInsertSchema(robotsTable);
export const robotSelectSchema = createSelectSchema(robotsTable);
