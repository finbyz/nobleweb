//happy clients
// $(document).ready(function () {
//     $("#clients-slider").owlCarousel({
//         items: 3,
//         itemsDesktop: [1199, 2],
//         itemsDesktopSmall: [979, 2],
//         itemsTablet: [767, 1],
//         pagination: false,
//         navigation: true,
//         navigationText: ["", ""],
//         autoPlay: true
//     });
// });

/* Navigation bar */


function nobleNavDropdowns(e) {
    var t = this;
    this.container = document.querySelector(e),
        this.root = this.container.querySelector(".navRoot"),
        this.primaryNav = this.root.querySelector(".navSection.primary"),
        this.primaryNavItem = this.root.querySelector(".navSection.primary .rootLink:last-child"),
        this.secondaryNavItem = this.root.querySelector(".navSection.secondary .rootLink:first-child"),
        this.checkCollision(),
        window.addEventListener("load", this.checkCollision.bind(this)),
        window.addEventListener("resize", this.checkCollision.bind(this)),
        this.container.classList.add("noDropdownTransition"),
        this.dropdownBackground = this.container.querySelector(".dropdownBackground"),
        this.dropdownBackgroundAlt = this.container.querySelector(".alternateBackground"),
        this.dropdownContainer = this.container.querySelector(".dropdownContainer"),
        this.dropdownArrow = this.container.querySelector(".dropdownArrow"),
        this.dropdownRoots = Strut.queryArray(".hasDropdown", this.root),
        this.dropdownSections = Strut.queryArray(".dropdownSection", this.container).map(function (e) {
            return {
                el: e,
                name: e.getAttribute("data-dropdown"),
                content: e.querySelector(".dropdownContent")
            }
        });
    var n = window.PointerEvent ? {
        end: "pointerup",
        enter: "pointerenter",
        leave: "pointerleave"
    } : {
            end: "touchend",
            enter: "mouseenter",
            leave: "mouseleave"
        };
    this.dropdownRoots.forEach(function (e, r) {
        e.addEventListener(n.end, function (n) {
            n.preventDefault(), n.stopPropagation(), t.toggleDropdown(e)
        }), e.addEventListener(n.enter, function (n) {
            if (n.pointerType == "touch") return;
            t.stopCloseTimeout(), t.openDropdown(e)
        }), e.addEventListener(n.leave, function (e) {
            if (e.pointerType == "touch") return;
            t.startCloseTimeout()
        })
    }), this.dropdownContainer.addEventListener(n.end, function (e) {
        e.stopPropagation()
    }), this.dropdownContainer.addEventListener(n.enter, function (e) {
        if (e.pointerType == "touch") return;
        t.stopCloseTimeout()
    }), this.dropdownContainer.addEventListener(n.leave, function (e) {
        if (e.pointerType == "touch") return;
        t.startCloseTimeout()
    }), document.body.addEventListener(n.end, function (e) {
        t.closeDropdown()
    })
}
/* end finbyznavDropdown */

/* Starting code */
var Strut = {
    queryArray: function (e, t) {
        // console.log(e,t);
        return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e))
    },
    ready: function (e) {
        // console.log(e);
        document.addEventListener("DOMContentLoaded", e)
    }
};


Strut.supports = {
    pointerEvents: function () {

        var e = document.createElement("a").style;
        // console.log(e);
        return e.cssText = "pointer-events:auto", e.pointerEvents === "auto"

    }(),
},

    nobleNavDropdowns.prototype.checkCollision = function () {

        var e = this;

        if (Strut.isMobileViewport) return;

        if (e.compact == 1) {

            var t = document.body.clientWidth,

                n = e.primaryNav.getBoundingClientRect();

            n.left + n.width / 2 > t / 2 && (e.container.classList.remove("test"), e.compact = !1)

        } else {

            var r = e.primaryNavItem.getBoundingClientRect(),

                i = e.secondaryNavItem.getBoundingClientRect();

            r.right > i.left && (e.container.classList.add("test"), e.compact = !0)

        }
    },


    nobleNavDropdowns.prototype.openDropdown = function (e) {
        var t = this;
        if (this.activeDropdown === e) return;
        this.container.classList.add("overlayActive"), this.container.classList.add("dropdownActive"), this.activeDropdown = e, this.dropdownRoots.forEach(function (e, t) {
            e.classList.remove("active")
        }), e.classList.add("active");
        var n = e.getAttribute("data-dropdown"),
            r = "left",
            i, s, o;
        this.dropdownSections.forEach(function (e) {
            e.el.classList.remove("active"), e.el.classList.remove("left"), e.el.classList.remove("right"), e.name == n ? (e.el.classList.add("active"), r = "right", i = e.content.offsetWidth, s = e.content.offsetHeight, o = e.content) : e.el.classList.add(r)
        });
        var u = 520,
            a = 400,
            f = i / u,
            l = s / a,
            c = e.getBoundingClientRect(),
            h = c.left + c.width / 2 - i / 2;

        h = Math.round(Math.max(h, 10)), clearTimeout(this.disableTransitionTimeout), this.enableTransitionTimeout = setTimeout(function () {
            t.container.classList.remove("noDropdownTransition")
        }, 50), this.dropdownBackground.style.transform = "translateX(" + h + "px) scaleX(" + f + ") scaleY(" + l + ")", this.dropdownContainer.style.transform = "translateX(" + h + "px)", this.dropdownContainer.style.width = i + "px", this.dropdownContainer.style.height = s + "px";
        var p = Math.round(c.left + c.width / 2);

        this.dropdownArrow.style.transform = "translateX(" + p + "px) rotate(45deg)";

        var d = o.children[0].offsetHeight / l;

        this.dropdownBackgroundAlt.style.transform = "translateY(" + d + "px)"

    },
    nobleNavDropdowns.prototype.closeDropdown = function () {

        var e = this;

        if (!this.activeDropdown) return;

        this.dropdownRoots.forEach(function (e, t) {

            e.classList.remove("active")

        }),

            clearTimeout(this.enableTransitionTimeout),

            this.container.classList.remove("overlayActive"),

            this.container.classList.remove("dropdownActive"),

            this.activeDropdown = undefined

    }, nobleNavDropdowns.prototype.toggleDropdown = function (e) {
        this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
    }, nobleNavDropdowns.prototype.startCloseTimeout = function () {
        var e = this;
        e.closeDropdownTimeout = setTimeout(function () {
            e.closeDropdown()
        }, 180)
    }, nobleNavDropdowns.prototype.stopCloseTimeout = function () {
        var e = this;
        clearTimeout(e.closeDropdownTimeout)
    }, Strut.supports.pointerEvents, Strut.ready(function () {
        new nobleNavDropdowns(".nobleNav")
    });
/* Multilevel Sidebar - menu */

$(".go-tosub-menu").on("click", function (event) {
    let lsid = $(this).data("ls");
    let icon = $(this).data("icon");
    if ($(`#${lsid}`).hasClass("d-block")) {
        $(`#${lsid}`).parent("li").removeClass("show").addClass("showreverce");
        let $li = $("#navsidebar").children("ul").children("li");
        $(`#${lsid}`).parent("li").removeClass("show");
        setTimeout(() => {
            $.each($li, function (ix, list) {
                $(this).removeClass("d-none");
            });
            $("#navsidebar").children("ul").addClass("show");
            $(`#${lsid}`).parent("li").children("img").removeClass("d-none");
            $(`#${lsid}`).parent("li").find("a img:first").addClass("d-none");
            $(`#${lsid}`).parent("li").children("ul:first").removeClass("d-block").addClass("d-none");
            $(`#${lsid}`).parent("li").removeClass("showreverce");
            setTimeout(() => {
                $("#navsidebar").children("ul").removeClass("show");
            }, 500)
        }, 500)
    } else {
        if ($(`#${lsid}`).addClass("d-block")) {
            $(`#${lsid}`).parent("li").removeClass("showreverce").addClass("show").parent("li").children("img").addClass("d-none");
            $(`#${lsid}`).parent("li").children("img").addClass("d-none");
            $(`#${lsid}`).parent("li").find("a img:first").removeClass("d-none");
            let $li = $("#navsidebar").children("ul").children("li").not("li.show");
            $.each($li, function (ix, list) {
                $(this).addClass("d-none");
            });
        }
    }
});

$('#navsidebarCollapse').on('click', function () {
    $('#navsidebar').toggleClass('active');
    $("header.nobleNav div.nav-wrapper").css({
        "left": "0px",
    });
    if ($(this).hasClass('active')) {
        $("header.nobleNav div.nav-wrapper").css({
            "left": "-50px",
        });
    }
    $(this).toggleClass('active');
});
/* end multilevel sidebar */

//navbar images
$('.tabanchor').on('mouseenter', function (e) {
    var getTab = $(this).attr('href');
    $(this).parent().addClass('active');
    $('.flex-inner').removeClass('active')
    $(getTab).addClass('active')
    e.preventDefault();
})
$(document).ready(function(){
    $("#happy-customer-slider").owlCarousel({
        items:1,
        itemsDesktop:[1000,1],
        itemsDesktopSmall:[979,1],
        itemsTablet:[768,1],
        pagination: false,
        autoPlay:true
    });
});
// $(document).ready(function() {
//     var Controller = new ScrollMagic.Controller();
//             var tl = new TimelineMax();
//                    tl.staggerFrom('.product_gird_4',0.2,{scale:0.1,x:-200, opacity: 0, ease:Circ.easeInOut});
//                    tl.staggerFrom('.product_gird_3',0.2,{scale:0.1,x:-200, opacity: 0, ease: Circ.easeInOut});
//                    tl.staggerFrom('.product_gird_2',0.2,{scale:0.1,x:-200, opacity: 0, ease: Circ.easeInOut});
//                    tl.staggerFrom('.product_gird_1',0.2,{scale:0.1,x:-200, opacity: 0, ease: Circ.easeInOut});
//                         new ScrollMagic.Scene({
//                             triggerElement: ".team-area",
//                             triggerHook:0.3,
//                         })
//    .setTween(tl)
//    .addTo(Controller);
// });

//*custom
$(document).ready(function() {
    var scrollController = new ScrollMagic.Controller();
     $(".fadeinleft").each(function () {

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8,
        })
            .setTween(TweenMax.from(this, 0.9, {
                x: 50,
                opacity: 0,
              ease: Linear.easeNone,
            }))
            .addTo(scrollController)
    })
        $(".fadeinright").each(function () {

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.7,
        })
            .setTween(TweenMax.from(this, 0.5, {
                x: -80,
                opacity: 0,
                ease: Linear.easeNone,
            }))
            .addTo(scrollController)
    })

    $(".nobel-fadeinzoom").each(function () {

                   new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 0.7,
                    })
                .setTween(TweenMax.from(this, 0.7, {
                        
                scale:1,
                opacity: 1,
                ease: Power3.easeInOut,
                }))
            .addTo(scrollController)
        })
    $(".nobel-fadeinzoom-out").each(function () {
        
                new ScrollMagic.Scene({
                     triggerElement: this,
                    triggerHook: 0.8,
                    })
                    .setTween(TweenMax.from(this, 0.5, {
            
                scale:0.1,
                opacity: 0,
                ease: Power3.easeInOut,
                }))
                .addTo(scrollController)
            })
    $(".nobel-fadeinup").each(function () {
        
                new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                })
                    .setTween(TweenMax.from(this, 1.3, {
                        y: 45,
                        opacity: 0,
                        ease:Power1.easeOut,
                    }))
                    .addTo(scrollController)
                })
        
     $(".nobel-fadeindown").each(function () {
        
                    ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.9,
                    })
                        .setTween(TweenMax.from(this, 1.3, {
                            y: -45,
                            opacity: 0,
                            ease: Power1.easeOut,
                        }))
                        .addTo(scrollController)
                })
        
        // text Animation
        
    $(".nobel-fadeinright").each(function () {
        
                    new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.7,
                    })
                        .setTween(TweenMax.from(this, 0.8, {
                            x: 80,
                            opacity: 0,
                            ease: Power1.easeOut,
                        }))
                        .addTo(scrollController)
                })
    $(".nobel-fadeinleft").each(function () {
        
                    new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.7,
                    })
                        .setTween(TweenMax.staggerFrom(this, 0.8, {
                            x: -80,
                            opacity: 0,
                            ease: Power1.easeOut,
                        }))
                        .addTo(scrollController)
                    })
        
                    // image animation
                    $(".nobel-image-fadeinleft").each(function () {
        
                        new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 0.9,
                        })
                            .setTween(TweenMax.from(this, 1.1, {
                                x: -80,
                                opacity: 0,
                                ease: Sine.easeInOut,
                            }))
                            .addTo(scrollController)
                        })
                $(".nobel-image-fadeinup").each(function () {
        
                    new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.9,
                    })
                        .setTween(TweenMax.from(this, 1.1, {
                            y: 75,
                            opacity: 0,
                            ease: Sine.easeInOut,
                        }))
                        .addTo(scrollController)
                    })
                 
     //about us   
    $(".nobel-image-fadeindown").each(function () {
                        new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 1,
                        })
                            .setTween(TweenMax.staggerFrom(this, 0.8, {
                                y: -70,
                                opacity: 0,
                                ease: Sine.easeInOut,
                            }))
                            .addTo(scrollController)
                         
                    })
    $(".nobel-image-fadeinzoom-out").each(function () {
                        new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 1,
                        })
                        .setTween(TweenMax.from(this, 1.2, {
                            scale:0.1,
                            opacity: 0,
                            ease:Power0.easeNone,
                            }))
                            .addTo(scrollController)
                    })                           
});

$(document).ready(function() {
    ScrollTrigger.batch(".fade-products", {
        onEnter: batch => gsap.from(batch ,0.7 , { sacle:0 , opacity:0 , x: -400 , stagger: 0.2, ease:Back.easeOut}),
      });
})
$(window).scroll(function() { 

    var scroll = $(window).scrollTop();
    
    if (scroll >= 10) {
        $(".nobleNav").addClass("active");
    }
    else {
        $(".nobleNav").removeClass("active");
    }
});