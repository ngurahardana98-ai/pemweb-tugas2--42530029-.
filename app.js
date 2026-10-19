const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');

// Mengunci path absolut untuk views dan public menggunakan modul path
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Sumber data berbasis Array/Objek JavaScript lokal (tanpa database)
const menuList = [
    {
        id: 1,
        nama: "Caffè Latte",
        kategori: "kopi",
        harga: 28000,
        deskripsi: "Kombinasi espresso yang kaya rasa dengan susu steamed bertekstur lembut dan lapisan tipis microfoam di atasnya.",
        gambar: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500"
    },
    {
        id: 2,
        nama: "Caffè Americano",
        kategori: "kopi",
        harga: 22000,
        deskripsi: "Satu shot espresso yang dilarutkan dengan air panas, memberikan cita rasa kopi yang mantap dengan tekstur yang lebih ringan.",
        gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500"
    },
    {
        id: 3,
        nama: "Matcha Latte",
        kategori: "non-kopi",
        harga: 32000,
        deskripsi: "Bubuk matcha Jepang kualitas tinggi yang diseduh dengan susu hangat segar dan sedikit rasa manis alami.",
        gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500"
    },
    {
        id: 4,
        nama: "Butter Croissant",
        kategori: "makanan",
        harga: 25000,
        deskripsi: "Pastry renyah khas Prancis beraroma mentega gurih yang dibuat fresh setiap pagi.",
        gambar: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500"
    }
];

// Rute Halaman Utama & Katalog Menu (Membaca Query Parameter req.query)
app.get('/', (req, res) => {
    const { kategori } = req.query;
    let filteredMenu = menuList;

    if (kategori) {
        filteredMenu = menuList.filter(item => item.kategori.toLowerCase() === kategori.toLowerCase());
    }

    res.render('index', {
        title: 'Daftar Menu Coffee Shop',
        menus: filteredMenu,
        selectedKategori: kategori || 'semua'
    });
});

// Rute Detail Menu (Membaca Route Parameter req.params)
app.get('/menu/:id', (req, res) => {
    const menuId = parseInt(req.params.id);
    const menu = menuList.find(item => item.id === menuId);

    if (!menu) {
        return res.status(404).render('404', {
            title: 'Menu Tidak Ditemukan'
        });
    }

    res.render('detail', {
        title: `Detail - ${menu.nama}`,
        menu: menu
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});