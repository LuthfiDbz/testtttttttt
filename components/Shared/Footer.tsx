import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-primary-950 px-26 pt-20 pb-4">
      <div className="grid grid-cols-5 text-primary-50">
        <div className="col-span-2">
          <Link href='/' className='flex gap-2 flex-center'>
            <Image
              src='/assets/img/logo.png'
              alt='logo'
              width={200}
              height={200}
              className='object-contain'
            />
          </Link>
          <ul className="text-xl my-10 flex flex-col gap-3 pe-32">
            <li className="flex items-center">
              <Image
                src='/assets/icon/socmed/mark.png'
                alt='logo'
                width={25}
                height={25}
                className="-ms-1 me-2"
              />
              PT Superkul Amerta Indonesia
            </li>
            <li className="flex items-center">
              <Image
                src='/assets/icon/socmed/phone.png'
                alt='logo'
                width={25}
                height={25}
                className="-ms-1 me-2"
              />
              02138789089
            </li>
            <li className="flex items-center">
              <Image
                src='/assets/icon/socmed/email.png'
                alt='logo'
                width={25}
                height={25}
                className="-ms-1 me-2"
              />
              admin@superkul.id
            </li>
            <li className="flex items-start">
              <Image
                src='/assets/icon/socmed/address.png'
                alt='logo'
                width={25}
                height={25}
                className="-ms-1 me-2 mt-1"
              />
              Ruko Golden 8, Jl. Panjang No. 8, RT.5/RW.11, Kedoya Utara, Kec. Kb. Jeruk <br />Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520
            </li>
          </ul>
          <div className="flex items-center gap-8">
            <Link href='https://www.facebook.com/Superkul.id/' target="_blank" rel="noopener noreferrer" className='flex gap-2 flex-center'>
              <Image
                src='/assets/icon/socmed/fb.png'
                alt='superkul-facebook'
                width={50}
                height={50}
                className='object-contain'
              />
            </Link>
            <Link href='https://www.instagram.com/superkul.id/' target="_blank" rel="noopener noreferrer" className='flex gap-2 flex-center'>
              <Image
                src='/assets/icon/socmed/ig.png'
                alt='superkul-instagram'
                width={50}
                height={50}
                className='object-contain'
              />
            </Link>
            <Link href='https://www.linkedin.com/company/pt-superkul-amerta-indonesia/mycompany/verification/' target="_blank" rel="noopener noreferrer" className='flex gap-2 flex-center'>
              <Image
                src='/assets/icon/socmed/linked.png'
                alt='superkul-linkedin'
                width={50}
                height={50}
                className='object-contain'
              />
            </Link>
            <Link href='https://api.whatsapp.com/send/?phone=%2B6282130000298&text&type=phone_number&app_absent=0' target="_blank" rel="noopener noreferrer" className='flex gap-2 flex-center'>
              <Image
                src='/assets/icon/socmed/wa.png'
                alt='superkul-whatsapp'
                width={50}
                height={50}
                className='object-contain'
              />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">Layanan</h4>
          <ul className="text-xl mt-5 flex flex-col gap-5">
            <Link href='/sameday-delivery'><li>Superkul Sameday Delivery</li></Link>
            <Link href='/dedicated'><li>Sewa Motor Superkul</li></Link>
            <Link href='/superkul-truck'><li>Superkul Truck</li></Link>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">Resource</h4>
          <ul className="text-xl mt-5 flex flex-col gap-5">
            <Link href='/articles'><li>Artikel</li></Link>
            <Link href='/'><li>Dokumentasi API</li></Link>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">Perusahaan</h4>
          <ul className="text-xl mt-5 flex flex-col gap-5">
            <Link href='/about-us'><li>Tentang Kami</li></Link>
            <Link href='/terms-conditions'><li>Syarat dan Ketentuan</li></Link>
            <Link href='/privacy-policy'><li>Kebijakan Privasi</li></Link>
            <Link href='/faq'><li>FAQ</li></Link>
          </ul>
        </div>
      </div>
      <hr className="mt-16" />
      <div className="text-center mt-4">Copyright © 2024 Superkul, Seluruh Hak Cipta</div>
    </div>
  )
}

export default Footer;