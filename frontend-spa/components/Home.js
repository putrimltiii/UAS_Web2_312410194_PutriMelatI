export default {
    template: `
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow">
            <h1 class="text-xl font-bold">E-Inventory</h1>
            <router-link to="/login" class="bg-white text-purple-700 px-4 py-2 rounded font-semibold hover:bg-purple-50">
                Login Admin
            </router-link>
        </nav>

        <div class="max-w-4xl mx-auto mt-16 text-center px-4">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Sistem Manajemen Inventaris</h2>
            <p class="text-gray-500 text-lg mb-8">Kelola data barang, kategori, dan stok dengan mudah dan efisien.</p>
            <router-link to="/login" class="bg-purple-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-800">
                Mulai Sekarang
            </router-link>
        </div>

        <div class="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-6 px-4">
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
    </div>
    `,
    data() {
        return {
            totalBarang: 0,
            totalKategori: 0,
            totalStok: 0,
        }
    },
    async mounted() {
        try {
            const barang = await axios.get('http://localhost/backend-api/public/api/barang', {
                headers: { Authorization: '' }
            })
            this.totalBarang = barang.data.data.length
            this.totalStok = barang.data.data.reduce((sum, b) => sum + parseInt(b.stok), 0)

            const kategori = await axios.get('http://localhost/backend-api/public/api/kategori', {
                headers: { Authorization: '' }
            })
            this.totalKategori = kategori.data.data.length
        } catch (e) {
            console.log(e)
        }
    }
}