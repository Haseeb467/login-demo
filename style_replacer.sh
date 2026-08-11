#!/bin/bash

# Define files to process
FILES=$(find src/components -type f -name "*.tsx")
FILES="$FILES src/App.tsx"

for file in $FILES; do
  # 1. Colors
  sed -i 's/bg-\[#ea7e26\]/bg-\[#1B3635\]/g' "$file"
  sed -i 's/text-\[#ea7e26\]/text-\[#1B3635\]/g' "$file"
  sed -i 's/border-\[#ea7e26\]/border-\[#1B3635\]/g' "$file"
  sed -i 's/ring-\[#ea7e26\]/ring-\[#1B3635\]/g' "$file"
  sed -i 's/hover:bg-orange-600/hover:bg-\[#142928\]/g' "$file"

  # 2. Main Wrapper Cards
  sed -i 's/bg-white rounded-lg shadow-sm/bg-white rounded-2xl shadow-\[0_20px_50px_rgba(0,0,0,0.05)\] border border-gray-100/g' "$file"

  # 3. Inputs
  sed -i 's/border border-gray-300 rounded p-3 text-sm focus:ring-\[#1B3635\] focus:border-\[#1B3635\] outline-none/bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-\[#1B3635\] focus:border-transparent outline-none transition-all text-gray-900/g' "$file"
  sed -i 's/border border-gray-300 rounded p-3 text-sm focus:ring-\[#1B3635\] outline-none/bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-\[#1B3635\] focus:border-transparent outline-none transition-all text-gray-900/g' "$file"

  # 4. Labels
  sed -i 's/block text-xs font-bold text-gray-800 uppercase/block text-xs font-semibold text-gray-400 uppercase tracking-wider/g' "$file"
  
  # 5. Buttons (Next Step)
  sed -i 's/bg-\[#333333\] hover:bg-\[#222222\] text-white rounded px-6 py-3 font-bold/bg-\[#1B3635\] hover:bg-\[#142928\] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900\/20/g' "$file"
  
  # 6. Buttons (Sign In / Create Account Bottom)
  sed -i 's/bg-\[#333333\] hover:bg-\[#222222\] text-white rounded px-8 py-3 font-bold/bg-\[#1B3635\] hover:bg-\[#142928\] text-white rounded-xl px-8 py-4 font-bold shadow-lg shadow-teal-900\/20/g' "$file"
  sed -i 's/bg-\[#333333\] hover:bg-\[#222222\] text-white py-3 rounded font-bold/bg-\[#1B3635\] hover:bg-\[#142928\] text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-900\/20/g' "$file"

  # 7. Step 1 Upload Files Button
  sed -i 's/border border-gray-800 text-gray-800 rounded px-6 py-2 font-bold/border border-gray-200 text-\[#1B3635\] rounded-xl px-6 py-3 font-bold hover:bg-gray-50/g' "$file"
  
  # 8. Create Account / Sign in Tabs in Step 1
  sed -i "s/bg-gray-400 text-white hover:bg-gray-500/bg-gray-100 text-gray-500 hover:bg-gray-200/g" "$file"
  sed -i "s/bg-\[#c5c5c5\] text-white hover:bg-gray-400/bg-gray-100 text-gray-500 hover:bg-gray-200/g" "$file"

  # 9. YES / NO buttons in Step 1
  sed -i "s/bg-gray-300 text-gray-600 hover:bg-gray-400/bg-gray-100 text-gray-500 hover:bg-gray-200/g" "$file"
  sed -i "s/px-8 py-2 rounded font-bold transition-colors/px-8 py-3 rounded-xl font-bold transition-colors/g" "$file"
done

echo "Replacements complete!"
