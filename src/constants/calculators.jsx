import { sanityClient } from "../../client"


const findName = async (id) => {
        
    try{
        const query = `*[_type == "calculations" && id == "${id}"]`
        const data = await sanityClient.fetch(query)
        return data[0].title
    }
    catch(err){
        console.log("Veri çekilirken hata meydana geldi!", err)
        return "Hesaplama adı bulunamadı"
    }
}

const calculators = [
    {
        title: "Püre İçin Hesaplayıcılar",
        calcs: [
            {
                title: await findName("seker_puresi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/sugar.png",
                link: "/calc/2"
            },
            {
                title: await findName("tahil_puresi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/grain.png",
                link: "#"
            },
            {
                title: await findName("meyve"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fruit.png",
                link: "#"
            },
            {
                // sorulacak
                title: await findName("as3"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/as3.png",
                // link: "/calc/30"
                link: "#"
            },
            {
                title: await findName("ac3"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fermentation.png",
                link: "/calc/3"
            },
            {
                title: await findName("refaktormetre"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/refractometer.png",
                link: "/calc/4"
            },
            {
                title: await findName("glikoz_fruktoz"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/fructose.png",
                link: "/calc/5"
            },
            {
                title: await findName("optimum_sira"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/ph.png",
                link: "/calc/1"
            },
            {
                title: await findName("chaptalizasyon"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/grape.png",
                link: "/calc/6"
            },
            {
                title: await findName("winemaker"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/wine.png",
                link: "/calc/7"
            },
            {
                title: await findName("wort"),
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
                title: await findName("kupteki_sivi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/liquid.png",
                link: "/calc/9"
            },
            {
                title: await findName("power"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/power.png",
                link: "/calc/10"
            },
            {
                title: await findName("kup_isitma_suresi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/heater.png",
                link: "/calc/11"
            },
            {
                title: await findName("kaynama_noktasi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/boiling.png",
                link: "/calc/12"
            },
            {
                title: await findName("spn"),
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
                title: await findName("reflu"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/reflu.png",
                link: "/calc/15"
            },
            {
                // hesap yok
                title: await findName("kup_sivi_sicakligi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alcholtemp.png",
                link: "#"
            },
            {
                title: await findName("damitma"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/distillation.png",
                link: "/calc/16"
            },
            {
                title: await findName("hedef"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/lab.png",
                link: "/calc/17"
            },
            {
                title: await findName("ikinci_damitma"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/second.png",
                link: "/calc/31"
            },
            {
                title: await findName("sivi_cekilme"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/timer.png",
                link: "/calc/18"
            },
            {
                title: await findName("hedef_kronometre"),
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
                title: await findName("alkol_sayac"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alkolfix.png",
                link: "/calc/23"
            },
            {
                // hatalı
                title: await findName("alkol_kutle"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol5.png",
                link: "/calc/24"
            },
            {
                // hesap yok
                title: await findName("alkol_seyreltme"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol2.png",
                link: "#"
            },
            {
                // bazıları hatalı
                title: await findName("alkol_karistirma"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol3.png",
                link: "/calc/25"
            },
            {
                // hesap yok
                title: await findName("nihai_alkol"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol4.png",
                link: "#"
            },
            {
                // hatalı
                title: await findName("alkol_hacim"),
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
                title: await findName("birim"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/unit.png",
                link: "/calc/27"
            },
            {
                title: await findName("mutlak_alkol_kaybi"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/alchol6.png",
                link: "/calc/28"
            },
            {
                title: await findName("anason"),
                desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque!",
                icon: "/icons/anise.png",
                link: "/calc/29"
            },
        ]
    }

]

export default calculators