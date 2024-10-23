<?php

namespace app\models;

// use yii\db\ActiveRecord;
use yii\web\UploadedFile;
use Yii;


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



    public $file;


    public function rules()
    {
        return [
            [['body'], 'string'],
            [['created_at'], 'safe'],
            [['id_user'], 'required'],
            [['id_user'], 'integer'],
            [['title', 'tag'], 'string', 'max' => 255],
            [['file_path'], 'string', 'max' => 512],
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
            'tag' => 'Tag',
            'file_path' => 'File Path',
        ];
    }
}
