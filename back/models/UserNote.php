<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "userNote".
 *
 * @property int $id_user
 * @property string $name
 * @property string $password
 */
class UserNote extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'userNote';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'password'], 'required'],
            [['name', 'password'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_user' => 'Id User',
            'name' => 'Name',
            'password' => 'Password',
        ];
    }
}
