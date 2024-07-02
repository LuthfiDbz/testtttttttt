import Image from "next/image";
import Link from "next/link";

type GetAppsType = {
  id: string
}

const GetApps = (props: GetAppsType) => {

  return (
    <div id={props.id} className="py-24 flex justify-between">
      <div className="bg-ice bg-contain bg-no-repeat ps-26 pt-40">
        <h3 className="text-text-primary text-4xl font-semibold w-3/4">Mau Kirim Barang Dingin, Sekarang bisa Order Superkul dari Handphonemu!</h3>
        <div className="flex gap-4 mt-32">
          <Link
            href={'https://apps.apple.com/id/app/superkul/id6450106454'}
            target="_blank"
          >
            <Image
              src='/assets/img/img-btn-playstore.png'
              alt="appstore"
              width={150}
              height={150}
              className="h-full"
            />
          </Link>
          <Link
            href={'https://play.google.com/store/apps/details?id=com.superkul.customer.app&pli=1'}
            target="_blank"
          >
            <Image
              src='/assets/img/img-btn-appstore.png'
              alt="appstore"
              width={150}
              height={130}
            />
          </Link>
        </div>
      </div>
      <Image
        src='/assets/img/img-banner-apps.png'
        alt="appstore"
        width={600}
        height={600}
      />
    </div>
  )
}

export default GetApps;