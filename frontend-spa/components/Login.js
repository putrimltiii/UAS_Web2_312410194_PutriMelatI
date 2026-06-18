export default {
    template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-purple-700 mb-6">Login Admin</h2>

            <div v-if="error" class="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
                {{ error }}
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 mb-1 font-medium">Username</label>
                <input v-model="username" type="text" placeholder="Masukkan username"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 mb-1 font-medium">Password</label>
                <input v-model="password" type="password" placeholder="Masukkan password"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
            </div>

            <button @click="login" :disabled="loading"
                class="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50">
                {{ loading ? 'Loading...' : 'Login' }}
            </button>
        </div>
    </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loading: false,
        }
    },
    methods: {
        async login() {
            this.loading = true
            this.error = ''
            try {
                const res = await axios.post('http://localhost/backend-api/public/api/login', {
                    username: this.username,
                    password: this.password
                })
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                this.$router.push('/dashboard')
            } catch (e) {
                this.error = 'Username atau password salah!'
            } finally {
                this.loading = false
            }
        }
    }
}