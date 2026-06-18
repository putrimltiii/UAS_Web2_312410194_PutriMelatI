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
                            class="block px-4 py-2 rounded-lg text-purple-700 bg-purple-50 font-medium">
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
                            class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium">
                            Kategori
                        </router-link>
                    </li>
                </ul>
            </aside>

            <main class="flex-1 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

                <div class="grid grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <p class="text-4xl font-bold text-purple-700">{{ totalBarang }}</p>
                        <p class="text-gray-500 mt-2">Total Barang</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <p class="text-4xl font-bold text-purple-500">{{ totalKategori }}</p>
                        <p class="text-gray-500 mt-2">Total Kategori</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <p class="text-4xl font-bold text-purple-900">{{ totalStok }}</p>
                        <p class="text-gray-500 mt-2">Total Stok</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-lg font-bold text-gray-700 mb-4">Data Barang Terbaru</h3>
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-purple-50 text-purple-700">
                                <th class="px-4 py-2 text-left rounded-l">Nama Barang</th>
                                <th class="px-4 py-2 text-left">Kategori</th>
                                <th class="px-4 py-2 text-left">Stok</th>
                                <th class="px-4 py-2 text-left rounded-r">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="b in barang" :key="b.id" class="border-b hover:bg-gray-50">
                                <td class="px-4 py-2">{{ b.nama_barang }}</td>
                                <td class="px-4 py-2">{{ b.nama_kategori }}</td>
                                <td class="px-4 py-2">{{ b.stok }} {{ b.satuan }}</td>
                                <td class="px-4 py-2">Rp {{ formatHarga(b.harga) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
    `,
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {},
            barang: [],
            totalBarang: 0,
            totalKategori: 0,
            totalStok: 0,
        }
    },
    async mounted() {
        const resBarang = await axios.get('http://localhost/backend-api/public/api/barang')
        this.barang = resBarang.data.data
        this.totalBarang = this.barang.length
        this.totalStok = this.barang.reduce((sum, b) => sum + parseInt(b.stok), 0)

        const resKategori = await axios.get('http://localhost/backend-api/public/api/kategori')
        this.totalKategori = resKategori.data.data.length
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
        formatHarga(harga) {
            return parseInt(harga).toLocaleString('id-ID')
        }
    }
}