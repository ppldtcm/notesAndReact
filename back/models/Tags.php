<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tags".
 *
 * @property int $id_tag
 * @property int $id_note
 * @property string $name
 */
class Tags extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tags';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_note', 'name'], 'required'],
            [['id_note'], 'integer'],
            [['name'], 'string', 'max' => 256],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_tag' => 'Id Tag',
            'id_note' => 'Id Note',
            'name' => 'Name',
        ];
    }
}
