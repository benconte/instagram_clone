import React from 'react'
import { footerLinks } from "../../../dummy"

function Footer() {
  return (
    <div className="mt-4">
      <div className="mb-2">
        {footerLinks.map((link, index) => (
          <span className="inline-block text-xs font-medium text-[#D1D1D1] after:content-['\00B7'] after:mx-1 cursor-pointer hover:underline">{link}</span>
        ))}
      </div>
      <footer className="text-xs text-[#D1D1D1] font-medium">
        © 2022 INSTAGRAM FROM META
      </footer>
    </div>
  )
}

export default Footer

// after:content-['\00B7'];     after:mx-0.25em;