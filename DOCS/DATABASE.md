# Database Dictionary

## Collections

### 1. Users (`users`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key |
| `name` | String | Full name |
| `email` | String | Unique email for login |
| `password` | String | Hashed password (Bcrypt) |
| `role` | String | `user` or `admin` |
| `address` | Object | Nested: street, city, zip, country |
| `wishlist` | Array | References to `Product` |

### 2. Products (`products`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_name` | String | Product title |
| `category` | String | `Fashion` or `Gadget` |
| `price` | Number | Unit price |
| `fashionDetails` | Object | sizes, materials, washCare (Optional) |
| `gadgetDetails` | Object | specs (Map), warranty, inBox (Optional) |
| `relatedItems` | Array | Cross-sell references |

### 3. Orders (`orders`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `user` | ObjectId | Ref to `User` |
| `items` | Array | `product`, `quantity`, `priceAtPurchase` |
| `totalAmount` | Number | Sum of item prices |
| `orderStatus` | String | Process, Shipped, Delivered, etc. |
| `tracking` | Array | Status updates with timestamps |

## Relationships
- **User -> Orders**: One-to-Many
- **Product -> Categories**: Categorical group
- **User -> Wishlist**: many-to-many (via array)
