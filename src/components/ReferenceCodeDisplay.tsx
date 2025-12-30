import React from 'react'

interface Props {
  referenceCode: string
}

export default function ReferenceCodeDisplay({ referenceCode }: Props) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">Reference Code</p>
        <p className="text-2xl font-mono font-medium text-gray-900 tracking-wider">
          {referenceCode}
        </p>
      </div>
    </div>
  )
}


