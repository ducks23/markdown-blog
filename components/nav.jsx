import { motion } from "framer-motion";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <div className="nav-div-container">
        <Link href={"/"}>
          <i style={{ color: "#8338ec" }} className="fas fa-home"></i>
        </Link>

        <div>
          <div className="example-container">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              {" "}
              <a className="link-button" href="https://jesse-leonard.com">
                My Portoflio{" "}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
