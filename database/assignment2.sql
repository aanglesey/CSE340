-- 1. INSERT 'Tony Stark' into 'account' table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. UPDATE 'Tony' to Admin
UPDATE account 
SET account_type = 'Admin'
WHERE account_id = 1;

-- 3. DELETE 'Tony' from account table
DELETE FROM account 
WHERE account_id = 1;

-- 4. Replace within "GM Hummer"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. INNER JOIN inventory and classification tables
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification ON classification.classification_id = inventory.classification_id
WHERE classification_name = 'Sport';

-- 6. UPDATE records to say "/vehicles"
UPDATE inventory SET 
	inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');