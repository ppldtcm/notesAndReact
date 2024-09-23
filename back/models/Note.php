<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "note".
 *
 * @property int $id_note
 * @property string|null $title
 * @property string|null $body
 * @property string $created_at
 * @property int $id_user
 */
class Note extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'note';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['body'], 'string'],
            [['created_at'], 'safe'],
            [['id_user'], 'required'],
            [['id_user'], 'integer'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_note' => 'Id Note',
            'title' => 'Title',
            'body' => 'Body',
            'created_at' => 'Created At',
            'id_user' => 'Id User',
        ];
    }
}
