# Model danych

## Tabele obowiązkowe

- `projects`
- `project_specs`
- `project_rooms`
- `project_media`
- `project_files`
- `project_addons`
- `project_variants`
- `project_search_index`
- `customers`
- `orders`
- `order_items`
- `payments`
- `payment_events`
- `email_logs`
- `download_links`
- `project_deliveries`
- `inquiries`

## projects

```sql
projects
- id uuid primary key
- code text unique not null
- slug text unique not null
- name text not null
- short_description text
- long_description text
- price_net numeric
- price_gross numeric
- promo_price_gross numeric
- currency text default 'PLN'
- status text
- category text
- house_type text
- style text
- tags text[]
- is_featured boolean default false
- is_bestseller boolean default false
- is_new boolean default false
- created_at timestamp
- updated_at timestamp
```

## project_specs

```sql
project_specs
- id uuid primary key
- project_id uuid references projects(id)
- usable_area numeric
- building_area numeric
- net_area numeric
- garage_area numeric
- rooms_count integer
- bathrooms_count integer
- floors_count integer
- garage_type text
- roof_type text
- roof_angle numeric
- building_height numeric
- min_plot_width numeric
- min_plot_length numeric
- wall_technology text
- heating_type text
- energy_standard text
```

## project_addons

```sql
project_addons
- id uuid primary key
- project_id uuid references projects(id)
- code text
- name text
- description text
- price_gross numeric
- addon_type text
- delivery_action text
- is_active boolean
- sort_order integer
```

Stały dodatek:

```txt
code: PDF_EMAIL_PACKAGE
name: Pakiet PDF na e-mail
price_gross: 250.00
addon_type: delivery
delivery_action: send_pdf_email
```

## orders

```sql
orders
- id uuid primary key
- order_number text unique
- customer_id uuid references customers(id)
- customer_email text
- customer_phone text
- customer_name text
- billing_data jsonb
- shipping_data jsonb
- status text
- payment_status text
- fulfillment_status text
- total_gross numeric
- currency text default 'PLN'
- delivery_preference text
- access_token_hash text
- legal_consents jsonb
- created_at timestamp
- updated_at timestamp
```

## order_items

```sql
order_items
- id uuid primary key
- order_id uuid references orders(id)
- project_id uuid references projects(id)
- project_code text
- project_name text
- variant_name text
- variant_price_gross numeric
- addons jsonb
- unit_price_gross numeric
- total_gross numeric
- fulfillment_status text
```

## project_deliveries

```sql
project_deliveries
- id uuid primary key
- order_id uuid references orders(id)
- order_item_id uuid references order_items(id)
- project_id uuid references projects(id)
- method text
- status text
- file_id uuid references project_files(id)
- download_link_id uuid references download_links(id)
- email_log_id uuid references email_logs(id)
- error_message text
- created_at timestamp
- sent_at timestamp
```
