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

Association
- belongs_to :group
- belongs_to :user


usersテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|
| adress|integer|null: false, foreign_key: true|
| password|integer|null: false, foreign_key: true|

Association
- has_many :members
- has_many :group, through: :members
- has_many :message

groupテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|

Association
- has_many :members
- has_many :users, through: :members
- has_many :users

messageテーブル
|Column|Type|Options|
|------|----|-------|
| user_id| integer| null: false, foreign_key: true|
| name|string|null: false, foreign_key: true|
| body|text|notnull: false, foreign_key: true|
| image|string|notnull: false, foreign_key: true|

Association
- belongs_to :user
- belongs_to :group