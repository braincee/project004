import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const contents = pgTable('contents', {
  id: uuid('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url').notNull(),
  fileType: text('file_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ContentAddresses = pgTable('content_addresses', {
  contentId: uuid('content_id')
    .notNull()
    .references(() => contents.id),
  addressId: uuid('address_id')
    .notNull()
    .references(() => addresses.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const Logs = pgTable('logs', {
  id: uuid('id').primaryKey().notNull(),
  log: text('log').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const Users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email').notNull(),
  password: text('password'),
  invited: boolean('invited'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const addressesRelations = relations(addresses, ({ many }) => ({
  ContentAddresses: many(ContentAddresses),
}))

export const contentsRelations = relations(contents, ({ many }) => ({
  ContentAddresses: many(ContentAddresses),
}))

export const ContentAddressesRelations = relations(
  ContentAddresses,
  ({ one }) => ({
    address: one(addresses, {
      fields: [ContentAddresses.addressId],
      references: [addresses.id],
    }),
    content: one(contents, {
      fields: [ContentAddresses.contentId],
      references: [contents.id],
    }),
  })
)
