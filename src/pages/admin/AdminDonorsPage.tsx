import React, { useState } from 'react';
import { HeartHandshake, Search, Download, Filter, Eye, ChevronDown } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Pagination from '../../components/ui/Pagination';
import { mockDonations, mockUsers } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../i18n';

interface DonorStats {
  userId: string;
  user: typeof mockUsers[0];
  totalDonated: number;
  donationCount: number;
  projectsSupported: string[];
  lastDonation: string;
}

const AdminDonorsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'total' | 'count' | 'recent'>('total');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  const donorMap = new Map<string, DonorStats>();
  mockDonations.forEach(d => {
    const user = mockUsers.find(u => u.id === d.userId) || mockUsers[0];
    if (donorMap.has(d.userId)) {
      const existing = donorMap.get(d.userId)!;
      existing.totalDonated += d.amount;
      existing.donationCount += 1;
      if (!existing.projectsSupported.includes(d.projectId)) existing.projectsSupported.push(d.projectId);
      if (new Date(d.createdAt) > new Date(existing.lastDonation)) existing.lastDonation = d.createdAt;
    } else {
      donorMap.set(d.userId, {
        userId: d.userId,
        user,
        totalDonated: d.amount,
        donationCount: 1,
        projectsSupported: [d.projectId],
        lastDonation: d.createdAt
      });
    }
  });

  let donors = Array.from(donorMap.values());

  if (search) donors = donors.filter(d => d.user.fullName.toLowerCase().includes(search.toLowerCase()) || d.user.email.toLowerCase().includes(search.toLowerCase()));

  if (sortBy === 'total') donors.sort((a, b) => b.totalDonated - a.totalDonated);
  else if (sortBy === 'count') donors.sort((a, b) => b.donationCount - a.donationCount);
  else donors.sort((a, b) => new Date(b.lastDonation).getTime() - new Date(a.lastDonation).getTime());

  const totalPages = Math.ceil(donors.length / itemsPerPage);
  const paginatedDonors = donors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalAmount = donors.reduce((sum, d) => sum + d.totalDonated, 0);
  const totalDonations = donors.reduce((sum, d) => sum + d.donationCount, 0);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-amber-500" />
            Donateurs
          </h1>
          <p className="text-slate-500 mt-1">Liste de tous les contributeurs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Download}>Exporter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
          <p className="text-sm text-slate-500 mb-1">Total Donateurs</p>
          <p className="text-3xl font-bold text-slate-800">{donors.length}</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm text-slate-500 mb-1">Total Donations</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <p className="text-sm text-slate-500 mb-1">Moyenne par donateur</p>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(Math.round(totalAmount / donors.length || 0))}</p>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input icon={Search} placeholder="Rechercher un donateur..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 border rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filtres
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500">
              <option value="total">Plus genereux</option>
              <option value="count">Plus actifs</option>
              <option value="recent">Plus recents</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Donateur</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Total donne</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Donations</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Projets soutenus</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Derniere donation</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDonors.map(donor => (
                <tr key={donor.userId} className="border-b hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={donor.user.avatar} name={donor.user.fullName} size="md" />
                      <div>
                        <p className="font-medium text-slate-800">{donor.user.fullName}</p>
                        <p className="text-sm text-slate-500">{donor.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-green-600">{formatCurrency(donor.totalDonated)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">{donor.donationCount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600">{donor.projectsSupported.length} projets</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-500">{formatDate(donor.lastDonation)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm" icon={Eye}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </Card>
    </div>
  );
};

export default AdminDonorsPage;
