import React, { useState } from "react";
import "../styles/privacyPolicy/privacyPolicy.scss";
import Swal from "sweetalert2";
import axios from "axios";
import BgBanner from '../assets/img/bg-banner-4.png'
import { Footer } from "../Component/footer/Footer";
import { useEffect } from "react";
import { t } from "i18next";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import SEO from "../Component/SEO/SEO";

export const TermConditionsDriver = () => {
  const [privacyData, setPrivacyData] = useState({});
  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_URL_CUST;

  useEffect(() => {
    getPrivacyData();
  }, []);

  const getPrivacyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/term-condition`);
      const data = response.data.data;
      setPrivacyData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), t('somethingError'), t('close'))
      }
    }
  };

  if (loading) return null;
  return (
    <>
      {/* <Header /> */}
      <SEO
        title={`Superkul | ${t('termConditions')} ${t('driver')}`}
        description="Ketentuan Penggunaan Driver Superkul ini (“Ketentuan Penggunaan”) mengatur akses atau penggunaan Anda (“Driver”) atas platform layanan informasi (“Platform”) melalui aplikasi seluler kami, aplikasi situs web (bersama-sama disebut “Aplikasi” ) atau situs web untuk menerima layanan yang disediakan oleh PT Superkul Amerta Indonesia, suatu perusahaan yang didirikan di Indonesia dengan kantor terdaftarnya di Ruko Golden 8, Jl. Panjang No. 8, RT.5/RW.11, Kedoya Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520(“PT. Superkul Amertha Indonesia”)."
        canonicalLink="https://superkul.id/terms-conditions"
      />
      <div className="container-privacy">
        <div className="privacy-bg" style={{ backgroundImage: `url(${BgBanner})` }}>
          <div className="text-container">
            <h3>{t('termConditions')} {t('driver')}</h3>
            <span>
              <a href="/">{t('home')}</a> / {t('termConditions')} {t('driver')}
            </span>
          </div>
        </div>
        <div className="container-form">
          <h1 className="title">Terms and Conditions for Driver Superkul</h1>
          <div>
            {/* <strong>Ketentuan Penggunaan untuk Driver Superkul</strong> */}
            Ketentuan Penggunaan Driver Superkul ini (“Ketentuan Penggunaan”) mengatur
            akses atau penggunaan Anda (“Driver”) atas platform layanan informasi (“Platform”)
            melalui aplikasi seluler kami, aplikasi situs web (bersama-sama disebut “Aplikasi” )
            atau situs web untuk menerima layanan yang disediakan oleh PT Superkul Amerta
            Indonesia, suatu perusahaan yang didirikan di Indonesia dengan kantor terdaftarnya
            di Ruko Golden 8, Jl. Panjang No. 8, RT.5/RW.11, Kedoya Utara, Kec. Kb. Jeruk, Kota
            Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520(“PT. Superkul Amertha
            Indonesia”).
            <br />
            <br />
            Harap memastikan bahwa Anda membaca dengan cermat Ketentuan Penggunaan
            ini baik yang dinyatakan atau dirujuk dalam Ketentuan Penggunaan sini sebelum
            mengakses atau menggunakan Platform. Ketentuan Penggunaan ini adalah suatu
            perjanjian hukum yang mengikat yang menetapkan hak dan kewajiban antara
            Superkul dan Anda, Driver.
            <br />
            <br />
            Dengan mengakses atau menggunakan Platform, Anda dengan ini secara tegas
            menyatakan bahwa:
            <br />
            ● Anda telah membaca dan memahami Ketentuan Penggunaan ini;
            <br />
            ● Anda akan mematuhi Ketentuan Penggunaan ini;
            <br />
            ● Anda telah berusia dewasa secara hukum di tempat tinggal Anda dan
            kompeten secara hukum untuk menandatangani kontrak; dan
            <br />
            ● Anda memiliki wewenang untuk menjadi terikat oleh Ketentuan Penggunaan
            ini secara pribadi dan, jika berlaku, atas nama organisasi mana pun yang atas
            namanya Anda telah mendaftar untuk dapat menggunakan Platform dan
            untuk mengikat organisasi tersebut dengan Ketentuan Penggunaan ini.
            <br />
            <br />
            Dalam Ketentuan Penggunaan ini, “Hukum Yang Berlaku” berarti undang-undang,
            peraturan, dan regulasi Indonesia yang berlaku yang mengatur pembayaran dan
            semua layanan yang disediakan berdasarkan Ketentuan Penggunaan ini,
            sebagaimana ketentuan di atas dapat diubah dan berlaku dari waktu ke waktu.
            <br />
            <br />
            Superkul berhak untuk mengubah Ketentuan Penggunaan ini dari waktu ke waktu.
            Jika kami melakukan perubahan, kami akan memberitahu Anda dengan merevisi
            tanggal yang tertera pada bagian atas Ketentuan Penggunaan dan, dalam beberapa
            kasus, kami akan menyampaikan kepada Anda suatu pemberitahuan tambahan
            (seperti menambahkan pernyataan pada beranda kami atau mengirim email
            pemberitahuan kepada Anda). Kami menghimbau agar Anda meninjau Ketentuan
            Penggunaan ini secara berkala untuk tetap mendapat informasi tentang praktik
            kami. Setiap kali kami membuat perubahan pada Ketentuan Penggunaan ini,
            perubahan tersebut berlaku pada saat Ketentuan Penggunaan yang direvisi itu
            diposting kecuali kami memberitahu Anda lain. Jika Anda terus menggunakan
            Platform setelah Ketentuan Penggunaan yang direvisi telah diposting, maka Anda
            akan dianggap telah menyetujui perubahan pada Ketentuan Penggunaan ini. Jika
            perubahan pada Ketentuan Penggunaan ini mempengaruhi hak dan kewajiban kami
            atau Anda dalam hal pengoperasian atau penggunaan Platform, kami dapat
            meminta Anda untuk menyetujui Ketentuan Penggunaan yang diubah sebelum
            mengizinkan Anda terus menggunakan Platform.
            <br />
            <br />
            1. LAYANAN KAMI
            <br />
            Layanan yang diberikan Superkul (“Layanan”) dimaksudkan untuk
            menghubungkan peminta layanan transportasi dan/atau logistik (termasuk
            namun tidak terbatas pada usaha kecil, pelanggan komersial dan pelanggan
            individu, secara bersama-sama disebut “Pengguna”) dan Pengemudi
            Pengiriman baik yang di bawah naungan Superkul maupun Pengemudi
            Pengiriman yang dibawah naungan Mitra Superkul (“Layanan Pengiriman”)
            melalui Platform. Anda mengakui dan setuju bahwa hubungan antara
            Pengemudi Pengiriman Superkul dengan Superkul adalah pemberi kerja dan
            karyawan, dan hubungan Mitra Superkul dengan Superkul adalah Mitra
            Pengiriman.
            <br />
            <br />
            2. PENGGUNAAN PERANGKAT LUNAK
            <br />
            Saat menggunakan perangkat lunak yang disediakan oleh Superkul
            (“Perangkat Lunak”), Anda setuju bahwa:
            <br />
            a. Anda tidak diizinkan untuk meminjamkan, menyewakan,
            mensublisensikan, mendistribusikan atau mengalihkan salinan
            Perangkat Lunak atau lisensi untuk penggunaan Perangkat Lunak
            kepada pihak ketiga mana pun;
            <br />
            b. Anda tidak boleh memeriksa, memindai, atau menguji kerentanan
            Platform atau jaringan apa pun yang terhubung ke Platform dan tidak
            boleh melanggar langkah-langkah keamanan atau otentikasi pada
            Platform atau jaringan apa pun yang terhubung ke Platform;
            <br />
            c. Anda tidak boleh memodifikasi, mengadaptasi, merekayasa balik,
            mendekompilasi, membongkar, menerjemahkan Perangkat Lunak atau
            membuat karya turunan berdasarkan Perangkat Lunak;
            <br />
            d. Anda tidak boleh mengganggu pengoperasian normal dari Perangkat
            Lunak, atau menggunakan metode apa pun untuk mengekspor atau
            memodifikasi kode sumber Perangkat Lunak;
            <br />
            e. Anda tidak boleh mengunggah atau mengirimkan segala jenis virus
            komputer, worm, trojan, atau kode berbahaya;
            <br />
            f. Anda tidak boleh memasang (install) dan/atau menjalankan Perangkat
            Lunak pada perangkat apa pun selain perangkat yang menjalankan
            sistem operasi yang disetujui oleh Superkul; dan
            <br />
            g. selain lisensi untuk menggunakan Perangkat Lunak yang diberikan dari
            Ketentuan Penggunaan ini, tidak ada lisensi atau hak lain yang dengan
            ini diberikan kepada Anda dan kepemilikan Perangkat Lunak dan
            semua hak lain dengan ini secara tegas dimiliki oleh Superkul dan
            pemasoknya.
            <br />
            <br />
            3. AKUN PENGEMUDI PENGIRIMAN
            <br />
            Agar Anda dapat menggunakan Layanan, Anda akan diberikan akun oleh
            Admin Superkul setelah Anda resmi terdaftar sebagai Pengemudi Pengiriman
            Superkul. Akun akan dikirim ke email yang Anda serahkan ketika proses
            rekruitasi. Anda bisa login pada platform Superkul dengan menggunakan
            email tersebut, dan password yang telah dikirim ke email Anda tersebut, atau
            mengubah password sesuai dengan keinginan Anda (disarankan untuk
            mengubah password yang sudah diberikan Superkul).
            <br />
            Anda bertanggung jawab untuk memperoleh dan memperbarui perangkat
            keras atau perangkat yang kompatibel yang diperlukan untuk mengakses dan
            menggunakan Layanan. Superkul tidak menjamin bahwa Layanan, atau
            bagian apa pun dari Layanan, akan berfungsi pada perangkat keras atau
            perangkat tertentu. Superkul berhak untuk menghentikan penggunaan
            Layanan jika Anda menggunakan Layanan pada perangkat yang tidak
            kompatibel atau tidak sah atau bahwa keamanan Akun Pengemudi
            Pengiriman Anda telah dilanggar dengan cara apa pun atau karena alasan apa
            pun yang kami anggap adil.
            <br />
            Saat menggunakan Layanan, Anda setuju bahwa:
            <br />
            a. Anda hanya boleh mengakses Layanan menggunakan sarana yang
            secara tegas diizinkan oleh Superkul;
            <br />
            b. Platform dan Layanan yang disediakan hanya akan digunakan oleh
            Anda, untuk penggunaan pribadi Anda dan tidak akan dijual kepada
            pihak ketiga mana pun;
            <br />
            c. Anda tidak akan mengizinkan pihak lain untuk menggunakan Akun
            Mitra Pengiriman Anda;
            <br />
            d. Anda hanya diperbolehkan membuka satu Akun Mitra Pengiriman;
            e. pengalihan Akun Mitra Pengiriman milik Anda kepada orang atau
            badan hukum lain tidak diizinkan;
            <br />
            f. Anda tidak dapat menggunakan akun yang menjadi hak orang lain
            selain Anda tanpa izin yang sesuai;
            <br />
            g. Layanan tidak dapat digunakan untuk tujuan-tujuan yang melanggar
            hukum, termasuk namun tidak terbatas pada (i) pelanggaran Hukum
            yang Berlaku; (ii) menyimpan atau mengirimkan materi yang melanggar
            hukum; (iii) berbagi informasi pribadi sensitif orang lain, tanpa
            persetujuan mereka (iv) menyebabkan bahaya, rintangan,
            ketidaknyamanan atau gangguan yang disengaja; (v) mengganggu atau
            merugikan pengoperasian Layanan yang semestinya; (vi)
            memperlihatkan diri dengan menyamar sebagai orang lain; atau (vii)
            menyalin atau mendistribusikan Layanan tanpa izin dari Superkul;
            <br />
            h. kata sandi Anda atau kredensial identitas apa pun yang diberikan
            Superkul kepada Anda harus aman dan rahasia;
            <br />
            i. bukti identitas atau dokumen lain harus segera diserahkan jika diminta
            oleh Superkul;
            <br />
            j. kepatuhan terhadap semua Hukum yang Berlaku adalah suatu
            keharusan saat menggunakan Layanan;
            <br />
            k. Anda tidak boleh menggunakan "deep-link", "post-scrape", "robot",
            "spider" atau perangkat, program, algoritma atau metodologi otomatis
            lain, atau proses manual yang serupa atau setara, untuk mengakses,
            memperoleh, menyalin, atau memantau bagian mana pun dari Platform
            atau konten apa pun, atau dengan cara apapun menyalin atau
            menghindari struktur navigasi atau presentasi Platform atau konten
            apa pun, untuk memperoleh atau berupaya memperoleh materi,
            dokumen, atau informasi apapun melalui cara apa pun yang tidak
            secara sengaja disediakan melalui Platform. Superkul berhak untuk
            melarang aktivitas semacam itu;
            <br />
            l. Anda tidak boleh mencoba untuk mengganggu, mengutak-atik
            integritas atau keamanan sistem atau menguraikan transmisi apapun
            ke atau dari server yang menjalankan Platform;
            <br />
            m. Anda tidak boleh mengumpulkan atau mengambil informasi pengenal
            pribadi apapun, termasuk nama akun, dari Platform; dan
            <br />
            n. Anda tidak boleh terlibat dalam mengancam, melecehkan, berlaku
            diskriminatif (berdasarkan ras, jenis kelamin, usia, disabilitas, atau
            klasifikasi lain yang dilindungi) atau perilaku lain apa pun yang
            dianggap tidak pantas oleh Superkul saat menggunakan Layanan.
            <br />
            <br />
            4. JAMINAN DAN PERNYATAAN PENGEMUDI PENGIRIMAN
            <br />
            Anda, sebagai Pengemudi Pengiriman, dengan ini secara tidak dapat ditarik
            kembali membuat jaminan dan pernyataan berikut:
            <br />
            a. Anda harus melakukan Absen setiap jam kerja dimulai dan berakhir.
            Absen hanya bisa dilakukan di area sekitar Pool Superkul.
            <br />
            b. Anda, harus menghidupkan tombol siap kerja sebagai tanda bahwa
            Pengemudi Pengiriman bersedia menerima permintaan pengiriman
            dari Layanan Superkul. Anda hanya diperbolehkan mematikan tombol
            siap kerja ketika keadaan darurat.
            <br />
            c. Anda wajib menerima permintaan pengiriman dari Layanan Superkul
            kecuali ada hal2 yang mendesak yang dapat dikonfirmasi. Jika Anda
            tidak menerima permintaan pengiriman dari Layanan Superkul, akun
            Superkul Anda akan dibekukan selama 60 detik dan Anda akan
            menerima pengurangan nilai kinerja atau performance score.
            <br />
            d. Setelah mendapatkan informasi Pengguna dan pengiriman, Pengemudi
            Pengiriman harus memverifikasi informasi tersebut sendiri;
            <br />
            e. Pengemudi Pengiriman memahami dan setuju bahwa ia bertanggung
            jawab untuk mematuhi semua jadwal pengiriman yang ditetapkan
            antara Superkul dan Pengguna. Pengemudi Pengiriman harus
            melakukan semua upaya yang wajar untuk mengirimkan kiriman sesuai
            dengan jadwal pengiriman masing-masing yang ditetapkan dengan
            Pengguna;
            <br />
            f. Anda bertanggung jawab untuk mengirimkan laporan keberhasilan
            setelah berhasil melakukan pengambilan atau pengiriman melalui
            platform Superkul (aplikasi driver).
            <br />
            g. Anda bertanggung jawab atas setiap dan semua klaim, penilaian dan
            kewajiban yang timbul dari kecelakaan, kehilangan atau kerusakan
            termasuk, namun tidak terbatas pada, cedera pribadi, kematian,
            kerugian total dan kerusakan harta benda yang disebabkan atau diduga
            sebagai akibat Layanan Pengiriman yang Anda berikan;
            <br />
            h. Anda bertanggung jawab atas isi semua pengiriman dan semua
            kerusakan atau kehilangan pengiriman pada saat menerima
            pengiriman. Pengemudi Pengiriman harus melakukan semua tindakan
            pencegahan yang wajar untuk mencegah orang yang tidak berwenang
            memiliki akses ke kiriman dan juga harus melakukan semua tindakan
            pencegahan yang wajar terhadap kehilangan atau kerusakan kiriman;
            <br />
            i. Anda harus, setiap saat ketika Anda menyediakan Layanan Pengiriman,
            memiliki SIM yang sah dan sesuai dan semua lisensi, izin, persetujuan
            dan/atau otoritas lain yang diperlukan untuk menyediakan Layanan
            Pengiriman.;
            <br />
            j. Selain Platform, Anda bertanggung jawab untuk memastikan
            kendaraan Superkul yang Anda pakai dalam kondisi baik, termasuk
            pengecekan Superkul Box;
            <br />
            k. Anda juga perlu memastikan bahwa suhu pada Superkul Box terjaga
            dengan baik. Dan suhu tersebut sudah sesuai dengan suhu pada data
            permintaan pengiriman oleh Pengguna.
            <br />
            <br />
            5. PEMBAYARAN
            <br />
            Pengemudi Pengiriman menyetujui bahwa Superkul bertanggung jawab untuk
            membayar komisi atas Layanan Pengiriman yang telah diselesaikan dengan
            menambahkan saldo pada dompet digital Pengemudi Pengiriman dengan
            nominal yang sesuai. Superkul berhak untuk mengubah harga yang
            dibebankan setiap saat, menurut kebijakannya sendiri. Superkul berhak untuk
            memotong pajak dari segala pembayaran yang relevan dan sesuai
            berdasarkan undang-undang pajak yang berlaku.
            <br />
            Superkul berhak untuk menangguhkan pemrosesan transaksi apa pun yang
            diyakini secara wajar bahwa transaksi tersebut mungkin penipuan, tidak sah,
            atau melibatkan aktivitas pidana apa pun atau di mana Anda dan/atau
            Pengguna telah melanggar salah satu persyaratan dalam Ketentuan
            Penggunaan ini. Dalam hal demikian, Anda tidak akan menuntut Superkul
            untuk bertanggung jawab atas pemotongan, penundaan, penangguhan,
            penyitaan, atau pembatalan, pembayaran apapun kepada Anda.
            <br />
            Superkul akan mengelola pembayaran kepada Anda dan dari Anda melalui
            sistem dompet. Saldo dompet Pengemudi Pengiriman Anda dapat ditarik oleh
            Anda di rekening bank yang Anda tentukan.
            <br />
            <br />
            6. KOMUNIKASI
            <br />
            Dengan membuat Akun Pengemudi Pengiriman dan menyetujui Ketentuan
            Penggunaan ini, Anda setuju untuk menerima dan menyetujui komunikasi dari
            Superkul termasuk melalui email, pesan teks, panggilan, dan pemberitahuan
            push ke perangkat seluler atau nomor ponsel yang Anda berikan kepada
            Superkul. Anda memahami dan menyetujui bahwa Anda dapat menerima
            komunikasi yang dihasilkan oleh sistem panggilan telepon otomatis dan/atau
            yang akan mengirimkan pesan yang direkam sebelumnya yang dikirim oleh
            atau atas nama Superkul, perusahaan afiliasinya dan/atau kontraktor pihak
            ketiga, termasuk namun tidak terbatas pada komunikasi mengenai pesanan
            diterima melalui pendaftaran Anda sehubungan dengan Layanan.
            <br />
            <br />
            7. HAK KEKAYAAN INTELEKTUAL
            <br />
            Superkul sendiri (dan pemberi lisensinya, sebagaimana berlaku) akan
            memiliki semua hak, alas hak, dan kepentingan, termasuk semua hak
            kekayaan intelektual terkait, pada dan atas Platform dan Layanan. Ketentuan
            ini tidak akan dianggap sebagai penjualan dan tidak memberikan kepada
            Anda hak kepemilikan apapun atas atau terkait dengan Platform dan Layanan,
            atau hak kekayaan intelektual apa pun yang dimiliki oleh Superkul. Nama
            perusahaan, logo, dan nama produk yang terkait dengan Platform dan
            Layanan adalah merek dagang dan/atau kekayaan intelektual Superkul atau
            pihak ketiga, dan tidak ada hak atau lisensi yang diberikan untuk
            menggunakannya. Anda setuju bahwa Anda tidak akan menghapus,
            mengubah atau mengaburkan hak cipta, merek dagang, merek layanan atau
            pemberitahuan hak kepemilikan lain yang dicantumkan pada atau menyertai
            Platform dan Layanan.
            <br />
            <br />
            8. VERSI BAHASA
            <br />
            Apabila terdapat pertentangan antara versi bahasa Inggris dan versi bahasa
            Indonesia, versi bahasa Indonesia akan berlaku dan versi bahasa Inggris akan
            dianggap secara otomatis diubah untuk menyesuaikan dengan dan membuat
            teks bahasa Inggris yang relevan sesuai dengan teks bahasa Indonesia yang
            relevan
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
