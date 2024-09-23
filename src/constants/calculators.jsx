const calculators = [
    {
        title: "Püre İçin Hesaplayıcılar",
        calcs: [
            {
                title: "Şeker Püresinin Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/sugar.png",
                link: "/calc/2"
            },
            {
                title: "Tahıl Püresinin Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/grain.png",
                link: "#"
            },
            {
                title: "Meyve veya Meyve Püresinin Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fruit.png",
                link: "#"
            },
            {
                // sorulacak
                title: "AS-3 Şeker Ölçüm Cihazı Okumalarının Düzeltilmesi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/as3.png",
                // link: "/calc/30"
                link: "#"
            },
            {
                title: "AC-3 Şeker Ölçüm Cihazına Göre Fermantasyon Sonrası Pürenin Alkol İçeriği",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fermentation.png",
                link: "/calc/3"
            },
            {
                title: "Refraktometreye Göre Fermantasyon Sonrası Pürenin Alkol İçeriği",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/refractometer.png",
                link: "/calc/4"
            },
            {
                title: "Şekerin Glikoz veya Fruktozla Değiştirilmesi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fructose.png",
                link: "/calc/5"
            },
            {
                title: "Optimum Şıra Asitliği",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/ph.png",
                link: "/calc/1"
            },
            {
                title: "Chaptalizasyon Hesaplayıcısı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/grape.png",
                link: "/calc/6"
            },
            {
                title: "Winemaker'ın Hesap Makinesi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/wine.png",
                link: "/calc/7"
            },
            {
                title: "Wort İçin Malt Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/malt.png",
                link: "/calc/8"
            },
        ]
    },

    {
        title: "Damıtma İçin Hesaplayıcılar",
        calcs: [
            {
                title: "Isıtma Elemanı Tarafından Buharlaştırıldıktan Sonra Küpte Kalan Sıvı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/liquid.png",
                link: "/calc/9"
            },
            {
                title: "Isıtma Elemanı Güç Hesabı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/power.png",
                link: "/calc/10"
            },
            {
                title: "Küp Isıtma Süresi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/heater.png",
                link: "/calc/11"
            },
            {
                title: "Kaynama Noktasının Alkol İçeriğine ve Basınca Bağlılığı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/boiling.png",
                link: "/calc/12"
            },
            {
                title: "SPN Nozul Hacmi Hesaplayıcısı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/nozzle.png",
                link: "/calc/13"
            },
            // {
            //     // kaldırılacak
            //     title: "Yük Altında Kademe Değiştirici Uzunluğu",
            //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
            //     icon: "/icons/column.png",
            //     link: "/calc/14"
            // },
            {
                title: "Reflü Oranının Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/reflu.png",
                link: "/calc/15"
            },
            {
                // hesap yok
                title: "Alkol İçeriğinin Küp İçindeki Sıvının Sıcaklığına Bağlılığı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alcholtemp.png",
                link: "#"
            },
            {
                title: "Suya Damıtma",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/distillation.png",
                link: "/calc/16"
            },
            {
                title: "Hedef Seçimi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/lab.png",
                link: "/calc/17"
            },
            {
                title: "İkinci Damıtma",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/second.png",
                link: "/calc/31"
            },
            {
                title: "Sıvı Çekilme Oranı Kronometresi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/timer.png",
                link: "/calc/18"
            },
            {
                title: "Hedef Seçimi Hız Kronometresi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/timer2.png",
                link: "#"
            },
        ]
    },

    {
        title: "Seyreltme İçin Hesaplayıcılar",
        calcs: [
            {
                title: "Alkol Sayacı Okumalarının Düzeltilmesi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alkolfix.png",
                link: "/calc/23"
            },
            {
                // hatalı
                title: "Alkol İçeriğinin Kütle ve Hacme Göre Hesaplanması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol5.png",
                link: "/calc/24"
            },
            {
                // hesap yok
                title: "Alkolün Suyla Seyreltilmesi",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol2.png",
                link: "#"
            },
            {
                // bazıları hatalı
                title: "Alkol ve Suyun Karıştırılması",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol3.png",
                link: "/calc/25"
            },
            {
                // hesap yok
                title: "Nihai Alkol İçeriğini Bulmak İçin Farklı Alkol İçeriklerine Sahip Sıvıları Karıştırmak",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol4.png",
                link: "#"
            },
            {
                // hatalı
                title: "İstenilen Hacmi ve Alkol İçeriğini Bulmak için Farklı Alkol İçeriklerine Sahip Sıvıları Karıştırmak",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol.png",
                link: "/calc/26"
            },
            
        ]
    },

    {
        title: "Diğer Hesaplayıcılar",
        calcs: [
            {
                title: "Birim Dönüştürme",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/unit.png",
                link: "/calc/27"
            },
            {
                title: "Mutlak Alkol Kayıpları",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol6.png",
                link: "/calc/28"
            },
            {
                title: "Anason Hesabı",
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/anise.png",
                link: "/calc/29"
            },
        ]
    }

]

export default calculators