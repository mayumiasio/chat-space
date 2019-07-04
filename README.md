# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


usersテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|
| adress|integer|null: false, foreign_key: true|
| password|integer|null: false, foreign_key: true|

groupテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|


messageテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|
| body|text|notnull: false, foreign_key: true|


Post photoテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|
| image|string|notnull: false, foreign_key: true|

Association
- belongs_to :group
- belongs_to :user