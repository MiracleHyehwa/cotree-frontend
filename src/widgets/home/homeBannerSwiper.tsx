import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  {
    image:
      "https://minfo.lotteshopping.com/content/contentdisplay/202505/SNM00000000000457378/20250529181426531_6.jpeg",
    brand: "YSL BEAUTY",
    title: "[2025 상반기 결산]",
    subtitle: "롯데 뷰티 어워즈",
  },
  {
    image:
      "https://minfo.lotteshopping.com/content/contentdisplay/202505/SNM00000000000453887/20250523091448292_6.jpeg",
    brand: "WEDDING MEMBERS",
    title: "웨딩마일리지 개편 안내",
    subtitle: "",
  },
  {
    image:
      "https://minfo.lotteshopping.com/content/contentdisplay/202505/SNM00000000000457364/20250530162211905_0.jpeg",
    brand: "MEN'S WEEK",
    title: "2025 상반기",
    subtitle: "남성 패션 위크",
  },
];

export default function HomeBannerSwiper() {
  return (
    <div className="w-full max-w-limit mx-auto px-4">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        className="swiper-coverflow"
        coverflowEffect={{
          rotate: 70,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {banners.map((b, idx) => (
          <SwiperSlide key={idx} className="w-full h-full max-h-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={b.image} className="w-full h-full object-cover" alt={`slide-${idx}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <div className="text-sm font-semibold tracking-wide opacity-90">{b.brand}</div>
              <div className="text-xl font-bold leading-snug">{b.title}</div>
              {b.subtitle && <div className="text-sm mt-1 opacity-80">{b.subtitle}</div>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
