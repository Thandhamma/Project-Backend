// --- SVG Icons as Components for cleaner code ---
// 🚀 แก้ไข: ลบ attributes ที่ไม่จำเป็นและไม่ถูกต้อง (fontFamily, fontWeight, fontSize, textAnchor) ออก
const PinterestIcon = () => (<svg className="w-6 h-6" viewBox="0,0,256,256"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><circle cx="24" cy="24" r="20" fill="#e60023"></circle><path d="M24.44391,11.41614c-8.63232,0 -13.21539,5.79462 -13.21539,12.10309c0,2.93384 1.56152,6.58539 4.06,7.74841c0.37842,0.17621 0.58154,0.10004 0.66846,-0.26691c0.06689,-0.27844 0.40381,-1.6369 0.55536,-2.26843c0.04846,-0.20154 0.02466,-0.37463 -0.13843,-0.57312c-0.82697,-1.00305 -1.48846,-2.84613 -1.48846,-4.56458c0,-4.41156 3.33997,-8.67999 9.02997,-8.67999c4.91309,0 8.35309,3.34845 8.35309,8.1369c0,5.40997 -2.7323,9.15845 -6.28693,9.15845c-1.96307,0 -3.43304,-1.62384 -2.96155,-3.61536c0.56543,-2.37695 1.65692,-4.94153 1.65692,-6.65845c0,-1.5354 -0.82306,-2.81696 -2.52997,-2.81696c-2.00696,0 -3.61847,2.07538 -3.61847,4.85693c0,1.77002 0.59845,2.96844 0.59845,2.96844c0,0 -1.9823,8.38153 -2.3454,9.94153c-0.40198,1.72229 -0.2453,4.1416 -0.07135,5.72339v0c0.45111,0.17688 0.9024,0.35376 1.36877,0.49811v0c0.81689,-1.32782 2.03497,-3.50568 2.48645,-5.24225c0.24384,-0.93616 1.24689,-4.75464 1.24689,-4.75464c0.65155,1.2439 2.55615,2.29694 4.58313,2.29694c6.03149,0 10.37842,-5.54694 10.37842,-12.44c0,-6.60846 -5.39154,-11.55151 -12.32996,-11.55151z" fill="#ffffff"></path></g></g></svg>);
const FacebookIcon = () => (<svg className="w-6 h-6" viewBox="0,0,256,256"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><path d="M42,37c0,2.762 -2.238,5 -5,5h-26c-2.761,0 -5,-2.238 -5,-5v-26c0,-2.762 2.239,-5 5,-5h26c2.762,0 5,2.238 5,5z" fill="#3f51b5"></path><path d="M34.368,25h-3.368v13h-5v-13h-3v-4h3v-2.41c0.002,-3.508 1.459,-5.59 5.592,-5.59h3.408v4h-2.287c-1.609,0 -1.713,0.6 -1.713,1.723v2.277h4z" fill="#ffffff"></path></g></g></svg>);
// ... Add other SVG Icon components similarly for Instagram, X, YouTube, TikTok

interface FooterProductProps {
    isVisible: boolean;
}

function FooterProduct({ isVisible }: FooterProductProps) {
    return (
        <footer className={`bg-pink-500 text-white text-xs p-4 w-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 invisible'}`}>
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 mb-3 w-full">
                <a href="#" aria-label="Pinterest" className="hover:opacity-80 transition-opacity"><PinterestIcon /></a>
                <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity"><FacebookIcon /></a>
                {/* Add other social icons here */}
            </div>

            {/* Policy Links */}
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mb-2">
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">CA Supply Chain</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">CA Privacy Rights</a>
            </div>

            {/* Copyright */}
            <p className="text-center mt-2">
                © 2025 Target Brands, Inc.
            </p>
        </footer>
    );
}

export default FooterProduct;

