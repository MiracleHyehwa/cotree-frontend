import { Link } from "react-router-dom";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  {
    label: "웨이팅/예약",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2023/12/21/102657/cakub.png",
    link: "#",
  },
  {
    label: "e슈퍼마켓",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2023/12/21/102657/ghpce.png",
    link: "#",
  },
  {
    label: "테이블오더",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2023/12/21/102657/qtlcq.png",
    link: "#",
  },
  {
    label: "셀프픽업",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2023/12/21/102657/tnwvk.png",
    link: "#",
  },
  {
    label: "뷰티",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2024/02/29/112400/bhwzq.png",
    link: "#",
  },
  {
    label: "선물하기",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2024/01/19/134633/xzhzu.png",
    link: "#",
  },
  {
    label: "투홈구독",
    image: "https://tohomeimage.thehyundai.com/DP/DP034/2024/01/19/134633/%7Bqyob.png",
    link: "#",
  },
];

export default function HomeCategorySwiper() {
  return (
    <div className="w-full max-w-limit mx-auto px-4 py-6">
      <Swiper modules={[FreeMode]} slidesPerView="auto" freeMode className="w-full">
        {categories.map((item, idx) => (
          <SwiperSlide key={idx} className="!w-20 text-center">
            <Link to={item.link} target="_self" className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.label}
                className="w-16 h-16 mb-2 rounded-full border border-gray-200 object-contain"
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
