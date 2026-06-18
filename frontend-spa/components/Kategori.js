export default {
    template: `
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow">
            <h1 class="text-xl font-bold">E-Inventory</h1>
            <div class="flex items-center gap-4">
                <span class="text-sm">Halo, {{ user.username }}</span>
                <button @click="logout" class="bg-white text-purple-700 px-4 py-2 rounded font-semibold hover:bg-purple-50">
                    Logout
                </button>
            </div>
        </nav>

        <div class="flex">
            <aside class="w-56 bg-white shadow min-h-screen p-4">
                <ul class="space-y-2">
                    <li>
                        <router-link to="/dashboard"
                            class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium">
                            Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/barang"
                            class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium">
                            Barang
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/kategori"
                            class="block px-4 py-2 rounded-lg text-purple-700 bg-purple-50 font-medium">
                            Kategori
                        </router-link>
                    </li>
                </ul>
            </aside>

            <main class="flex-1 p-8">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Data Kategori</h2>
                    <button @click="openModal()"
                        class="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 font-semibold">
                        + Tambah Kategori
                    </button>
                </div>

                <div class="bg-white rounded-xl shadow p-6">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-purple-50 text-purple-700">
                                <th class="px-4 py-2 text-left">No</th>
                                <th class="px-4 py-2 text-left">Nama Kategori</th>
                                <th class="px-4 py-2 text-left">Deskripsi</th>
                                <th class="px-4 py-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(k, i) in kategori" :key="k.id" class="border-b hover:bg-gray-50">
                                <td class="px-4 py-2">{{ i + 1 }}</td>
                                <td class="px-4 py-2">{{ k.nama_kategori }}</td>
                                <td class="px-4 py-2">{{ k.deskripsi }}</td>
                                <td class="px-4 py-2 flex gap-2">
                                    <button @click="openModal(k)"
                                        class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-xs">
                                        Edit
                                    </button>
                                    <button @click="hapus(k.id)"
                                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                <h3 class="text-xl font-bold text-gray-800 mb-6">
                    {{ form.id ? 'Edit Kategori' : 'Tambah Kategori' }}
                </h3>

                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Nama Kategori</label>
                    <input v-model="form.nama_kategori" type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 mb-1">Deskripsi</label>
                    <textarea v-model="form.deskripsi" rows="3"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
                </div>

                <div class="flex gap-3 justify-end">
                    <button @click="showModal = false"
                        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                        Batal
                    </button>
                    <button @click="simpan"
                        class="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 font-semibold">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {},
            kategori: [],
            showModal: false,
            form: { id: null, nama_kategori: '', deskripsi: '' }
        }
    },
    async mounted() {
        await this.loadKategori()
    },
    methods: {
        async loadKategori() {
            const res = await axios.get('http://localhost/backend-api/public/api/kategori')
            this.kategori = res.data.data
        },
        openModal(k = null) {
            this.form = k ? { ...k } : { id: null, nama_kategori: '', deskripsi: '' }
            this.showModal = true
        },
        async simpan() {
            if (this.form.id) {
                await axios.put(`http://localhost/backend-api/public/api/kategori/${this.form.id}`, this.form)
            } else {
                await axios.post('http://localhost/backend-api/public/api/kategori', this.form)
            }
            this.showModal = false
            await this.loadKategori()
        },
        async hapus(id) {
            if (confirm('Yakin ingin menghapus kategori ini?')) {
                await axios.delete(`http://localhost/backend-api/public/api/kategori/${id}`)
                await this.loadKategori()
            }
        },
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        }
    }
}