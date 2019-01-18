class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :name
      t.string :artists
      t.string :image
      t.float :duration
      t.integer :popularity
      t.string :preview

      t.timestamps
    end
  end
end
