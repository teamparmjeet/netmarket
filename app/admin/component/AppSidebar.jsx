"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSidebar } from '@/app/context/SidebarContext'
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, UserCircle, List, Table2Icon, StickyNote, BoxIcon, ChartArea, ChevronDown } from "lucide-react";
const navItems = [
    {
        icon: <Grid2X2 />,
        name: "Dashboard",
        path: "/admin",
    },
    {
        icon: <UserCircle />,
        name: "User Profile",
        subItems: [
            { name: "My Profile", path: "/admin/profile", pro: false },
            { name: "I-Card", path: "/admin/i-card", pro: false },
            // { name: "Upload Photos (I-Card)", path: "/admin/uploadIdcard", pro: false },
            // { name: "Agreement", path: "/admin/agreement", pro: false },
            // { name: "Addendum", path: "/admin/addendum", pro: false },
            { name: "Reupload KYC", path: "/admin/uploadId", pro: false },
            { name: "View KYC", path: "/admin/viewkyc", pro: false },
        ],
    },
    {
        icon: <UserCircle />,
        name: "Genealogy",
        subItems: [
            { name: "Sales Team", path: "/admin/salesteam", pro: false },
            { name: "Direct DS Code", path: "/admin/directds", pro: false },
            // { name: "Downline Printing", path: "/admin/downlineprinting", pro: false },
            { name: "Depth Downline", path: "/admin/depthdownline", pro: false },
        ],
    },
    {
        icon: <UserCircle />,
        name: "Account",
        subItems: [
            { name: "Sales Performance", path: "/admin/Account/salesperformance", pro: false },
            { name: "My Regular Sales Comission", path: "/admin/Account/regularsales", pro: false },
            { name: "Trip/Bonanzo Comission", path: "/admin/Account/tripcomission", pro: false },
            { name: "My Repurchase Payments", path: "/admin/Account/repurchasepayments", pro: false },
            { name: "Step Pendency", path: "/admin/Account/steppendency", pro: false },
        ],
    },
    {
        icon: <UserCircle />,
        name: "Trip/Bonanza",
        subItems: [
            { name: "Spring Bonanza", path: "/admin/Trips/springbonanza", pro: false },
            { name: "My Trip list", path: "/admin/Trips/mytriplist", pro: false },
        ],
    },
    {
        icon: <UserCircle />,
        name: "Order Form",
        subItems: [
            { name: "New Oreder Form", path: "/admin/OrderForm/neworder", pro: false },
            { name: "Pending Orders", path: "/admin/OrderForm/pendingorder", pro: false },
            { name: "My Approved Orders", path: "/admin/OrderForm/approvedorder", pro: false },
            { name: "Product List", path: "/admin/OrderForm/productlist", pro: false },
            { name: "Statement", path: "/admin/OrderForm/statement", pro: false },
        ],
    },
    
];

const othersItems = [
    {
        icon: <ChartArea />,
        name: "Charts",
        subItems: [
            { name: "Line Chart", path: "/line-chart", pro: false },
            { name: "Bar Chart", path: "/bar-chart", pro: false },
        ],
    },
    {
        icon: <BoxIcon />,
        name: "UI Elements",
        subItems: [
            { name: "Alerts", path: "/alerts", pro: false },
            { name: "Avatar", path: "/avatars", pro: false },
            { name: "Badge", path: "/badge", pro: false },
            { name: "Buttons", path: "/buttons", pro: false },
            { name: "Images", path: "/images", pro: false },
            { name: "Videos", path: "/videos", pro: false },
        ],
    },

];
const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const pathname = usePathname();

    const renderMenuItems = (navItems, menuType) => (
        <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <>
                            <button
                                onClick={() => {
                                    if (isExpanded || isHovered) {
                                        handleSubmenuToggle(index, menuType);
                                    }
                                }}
                                className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                                    } cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                                    }`}
                            >
                                <span
                                    className={`${openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                        }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <ChevronDown
                                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                            }`}
                                    />
                                )}
                            </button>
                            {(isExpanded || isHovered) && (
                                <div
                                    ref={(el) => (subMenuRefs.current[`${menuType}-${index}`] = el)}
                                    className={`overflow-hidden transition-all duration-300 ease-in-out
                                   ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                            ? "max-h-[500px] opacity-100"
                                            : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <ul className="ml-5 border-l pl-4 mt-2 space-y-2">
                                        {nav.subItems.map((sub) => (
                                            <li key={sub.path}>
                                                <Link
                                                    href={sub.path}
                                                    className={`block py-2 text-sm transition-all duration-200 
                                                   ${isActive(sub.path) ? "text-brand-500 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>

                    ) : (
                        nav.path && (
                            <Link
                                href={nav.path}
                                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                            >
                                <span className={`${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                </li>
            ))}
        </ul>
    );

    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const isActive = useCallback((path) => path === pathname, [pathname]);

    useEffect(() => {
        let submenuMatched = false;
        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : othersItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({ type: menuType, index });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);


    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => {
                    const newHeight = subMenuRefs.current[key]?.scrollHeight || 0;
                    console.log("Submenu Height:", newHeight);  // Add this log
                    return { ...prevHeights, [key]: newHeight };
                });
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prev) =>
            prev?.type === menuType && prev?.index === index ? null : { type: menuType, index }
        );
    };

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${isExpanded || isMobileOpen
                ? "w-[290px]"
                : isHovered
                    ? "w-[290px]"
                    : "w-[90px]"
                } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                <Link href="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <Image className="block dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
                            <Image className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
                        </>
                    ) : (
                        <Image src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400">Menu</h2>
                            {renderMenuItems(navItems, "main")}
                        </div>
                        <div>
                            <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400">Others</h2>
                            {renderMenuItems(othersItems, "others")}
                        </div>
                    </div>
                </nav>

            </div>
        </aside>
    );
};

export default AppSidebar;

