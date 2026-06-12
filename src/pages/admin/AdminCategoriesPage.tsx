import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Plus, Edit2, Trash2, Film, Music, Calendar, Palette, Theater, BookOpen, Search, Check, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

interface CategoryItem {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  color: string;
  projectCount: number;
  description: string;
}

const AdminCategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const categories: CategoryItem[] = [
    { id: 'film', name: 'Cinema', nameEn: 'Film', icon: <Film className="w-6 h-6" />, color: 'bg-red-500', projectCount: 24, description: 'Films, documentaires, courts-metrages' },
    { id: 'music', name: 'Musique', nameEn: 'Music', icon: <Music className="w-6 h-6" />, color: 'bg-purple-500', projectCount: 31, description: 'Albums, clips, concerts' },
    { id: 'events', name: 'Evenements', nameEn: 'Events', icon: <Calendar className="w-6 h-6" />, color: 'bg-blue-500', projectCount: 18, description: 'Festivals, expositions, conferences' },
    { id: 'arts', name: 'Arts Visuels', nameEn: 'Arts', icon: <Palette className="w-6 h-6" />, color: 'bg-pink-500', projectCount: 15, description: 'Peinture, sculpture, photographie' },
    { id: 'theater', name: 'Theatre', nameEn: 'Theater', icon: <Theater className="w-6 h-6" />, color: 'bg-amber-500', projectCount: 12, description: 'Pieces, spectacles, comedies' },
    { id: 'literature', name: 'Litterature', nameEn: 'Literature', icon: <BookOpen className="w-6 h-6" />, color: 'bg-green-500', projectCount: 9, description: 'Romans, poesie, bandes dessinees' },
  ];

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Tag className="w-7 h-7 text-amber-500" />
            Gestion des Categories
          </h1>
          <p className="text-slate-500 mt-1">Gerer les categories de projets</p>
        </div>
        <Button icon={Plus}>Ajouter une categorie</Button>
      </div>

      <Card className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input icon={Search} placeholder="Rechercher une categorie..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl ${category.color} text-white flex items-center justify-center flex-shrink-0`}>
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-800">{category.name}</h3>
                  <span className="text-xs text-slate-400">{category.nameEn}</span>
                </div>
                <p className="text-sm text-slate-500 mb-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-600">{category.projectCount} projets</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(category)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(category)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modifier la categorie">
        {selectedCategory && (
          <div className="space-y-4 pt-4">
            <Input label="Nom (Francais)" defaultValue={selectedCategory.name} />
            <Input label="Nom (Anglais)" defaultValue={selectedCategory.nameEn} />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea defaultValue={selectedCategory.description} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" rows={3} />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Annuler</Button>
              <Button icon={Check}>Enregistrer</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Supprimer la categorie">
        {selectedCategory && (
          <div className="space-y-4 pt-4">
            <p className="text-slate-600">Etes-vous sur de vouloir supprimer la categorie <strong>{selectedCategory.name}</strong> ?</p>
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">Attention: {selectedCategory.projectCount} projets sont associes a cette categorie.</p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
              <Button variant="danger" icon={Trash2}>Supprimer</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
