'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenLogo, setTokenLogo] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPaymentAddress, setShowPaymentAddress] = useState(false)
  const paymentBubbleRef = useRef<HTMLDivElement>(null)

  // Step 2 form fields
  const [tokenDescription, setTokenDescription] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [socialLinks, setSocialLinks] = useState({
    website: '',
    twitter: '',
    telegram: '',
    discord: ''
  })

  // Close payment bubble when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paymentBubbleRef.current && !paymentBubbleRef.current.contains(event.target as Node)) {
        setShowPaymentAddress(false)
      }
    }

    if (showPaymentAddress) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPaymentAddress])

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (tokenName && tokenSymbol) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTokenLogo(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    })
  }

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <>
          {/* Form Fields - Step 1 */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Token Name
              </label>
              <input
                type="text"
                placeholder="e.g. My Amazing Token"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Token Symbol
              </label>
              <input
                type="text"
                placeholder="e.g. MAT"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Token Logo
              </label>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer group relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {tokenLogo ? (
                  <div className="space-y-2">
                    <div className="text-green-600 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-purple-600 font-medium">Logo uploaded: {tokenLogo.name}</p>
                    <p className="text-purple-400 text-sm">Click to change</p>
                  </div>
                ) : (
                  <>
                    <div className="text-purple-400 mb-4 group-hover:text-purple-500 transition-colors">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-purple-600 font-medium">Click or drag to upload logo</p>
                    <p className="text-purple-400 text-sm mt-1">(recommended size: 200×200)</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-purple-600 cursor-not-allowed opacity-50 shadow-lg"
              >
                ←
              </button>
              <button
                onClick={handleNextStep}
                disabled={!tokenName || !tokenSymbol}
                className={`px-8 py-3 rounded-full font-medium transition-colors shadow-lg ${
                  tokenName && tokenSymbol
                    ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                    : 'bg-purple-300 text-purple-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )
    }

    if (currentStep === 2) {
      return (
        <>
          {/* Form Fields - Step 2 */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Token Description
              </label>
              <textarea
                placeholder="Describe your token and its purpose..."
                value={tokenDescription}
                onChange={(e) => setTokenDescription(e.target.value)}
                rows={4}
                className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Total Supply
              </label>
              <input
                type="number"
                placeholder="e.g. 1000000000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-purple-900 font-semibold mb-3 bg-gradient-to-r from-purple-200 to-purple-300 px-4 py-2 rounded-lg inline-block shadow-sm">
                Social Links (Optional)
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="Website URL"
                  value={socialLinks.website}
                  onChange={(e) => setSocialLinks({...socialLinks, website: e.target.value})}
                  className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                  className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="url"
                  placeholder="Telegram URL"
                  value={socialLinks.telegram}
                  onChange={(e) => setSocialLinks({...socialLinks, telegram: e.target.value})}
                  className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="url"
                  placeholder="Discord URL"
                  value={socialLinks.discord}
                  onChange={(e) => setSocialLinks({...socialLinks, discord: e.target.value})}
                  className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-8">
              <button
                onClick={handlePrevStep}
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors shadow-lg"
              >
                ←
              </button>
              <button
                onClick={handleNextStep}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )
    }

    if (currentStep === 3) {
      return (
        <>
          {/* Form Fields - Step 3 */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Review Your Token</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-600">Name:</span>
                  <span className="text-purple-900 font-medium">{tokenName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Symbol:</span>
                  <span className="text-purple-900 font-medium">{tokenSymbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Logo:</span>
                  <span className="text-purple-900 font-medium">{tokenLogo ? 'Uploaded' : 'Not uploaded'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Description:</span>
                  <span className="text-purple-900 font-medium">{tokenDescription || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Total Supply:</span>
                  <span className="text-purple-900 font-medium">{totalSupply || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Ready to Launch! Make Payment of .35 SOL to Proceed</h3>
              <p className="text-purple-800 mb-4">
                Your 20 SOL and token are ready to be deployed to the blockchain. Once payment is received, coin will be launched and available on the Dashboard. In the event you decide to change the coin click the "close" button to remove all liquidity. The amount of SOL loaned will be available in the Dashboard for 24 hours after payment for you to create new coins allowing you to re-use the loaned liquidity for a new coin.
              </p>
              <div className="relative inline-block">
                <button
                  onClick={() => setShowPaymentAddress(!showPaymentAddress)}
                  className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-purple-900 text-sm font-bold">₪</span>
                    </div>
                    Payment Address
                  </div>
                </button>

                {/* Payment Address Bubble */}
                {showPaymentAddress && (
                  <div
                    ref={paymentBubbleRef}
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-purple-200 rounded-lg shadow-lg p-4 min-w-max z-10"
                  >
                    <div className="text-sm text-purple-900 font-mono bg-purple-50 p-3 rounded border">
                      AX8UpKZ5yRDbpiYJj4VfHxqERVLwF1veKNRp7Cqa1pin
                    </div>
                    <button
                      onClick={() => copyToClipboard('AX8UpKZ5yRDbpiYJj4VfHxqERVLwF1veKNRp7Cqa1pin')}
                      className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded transition-colors"
                    >
                      Copy Address
                    </button>
                    {/* Arrow pointing up */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-white"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-8">
              <button
                onClick={handlePrevStep}
                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors shadow-lg"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-purple-300 hover:bg-purple-400 text-purple-700 px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
              >
                Start Over
              </button>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-3 px-4">
        <div className="text-sm font-medium">
          <span className="text-orange-300 font-bold">NEW!</span> BOOST YOUR TOKEN WITH OUR LIQUIDITY
          <br className="sm:hidden" />
          <span className="mx-2">CREATE TOKEN → GO TO "CREATE LP" → 20 SOL LIQUIDITY  (FEE 0.35 SOL ONLY!)</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-purple-50 px-6 py-4 border-b border-purple-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-purple-900">Liquidity Launcher</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-purple-700 hover:text-purple-900 font-medium">Dashboard</a>
            <a href="#" className="text-purple-700 hover:text-purple-900 font-medium">Assets</a>
            <a href="#" className="text-purple-700 hover:text-purple-900 font-medium">Waitlist</a>
            <a href="#" className="text-purple-700 hover:text-purple-900 font-medium">Referrals</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-purple-600 hover:text-purple-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
              SOL Supply:   220
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-200">
            <div className="flex flex-col space-y-2 pt-4">
              <a href="#" className="text-purple-700 hover:text-purple-900 font-medium py-2">FAQ</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 font-medium py-2">Quests</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 font-medium py-2">Create LP</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 font-medium py-2">Contact</a>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center py-16">
          <p className="text-purple-600 text-lg mb-8">The crypto service which instantly boosts your tokens value</p>

          <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-5xl md:text-8xl font-bold text-purple-900 md:mr-4">Your</h1>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-4 relative overflow-hidden shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-md">
                <span className="text-yellow-900 font-bold text-lg md:text-xl">₪</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-purple-900 md:ml-4">Trusted</h1>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-purple-900 mb-12">Launch Platform</h1>

          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full mr-3 flex items-center justify-center">
              <span className="text-yellow-900 text-sm font-bold">₪</span>
            </div>
            CREATE MEMECOIN
          </button>
        </section>

        {/* 3 Steps Section */}
        <section className="py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 text-center mb-16">Launch with 3 easy steps</h2>

          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-4 shadow-lg transition-colors ${
                  currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-purple-300 text-purple-600'
                }`}>1</div>
                <span className={`font-semibold text-sm md:text-base ${
                  currentStep >= 1 ? 'text-purple-900' : 'text-purple-500'
                }`}>Basic</span>
              </div>
              <div className={`w-8 md:w-16 h-0.5 transition-colors ${
                currentStep >= 2 ? 'bg-purple-600' : 'bg-purple-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-4 transition-colors ${
                  currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-purple-300 text-purple-600'
                }`}>2</div>
                <span className={`text-sm md:text-base ${
                  currentStep >= 2 ? 'text-purple-900 font-semibold' : 'text-purple-500'
                }`}>Details</span>
              </div>
              <div className={`w-8 md:w-16 h-0.5 transition-colors ${
                currentStep >= 3 ? 'bg-purple-600' : 'bg-purple-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-4 transition-colors ${
                  currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-purple-300 text-purple-600'
                }`}>3</div>
                <span className={`text-sm md:text-base ${
                  currentStep >= 3 ? 'text-purple-900 font-semibold' : 'text-purple-500'
                }`}>Dashboard</span>
              </div>
            </div>
          </div>

          {renderStepContent()}
        </section>

        {/* All in One Section */}
        <section className="py-16 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 md:mr-4">Your perfect launch</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 md:mr-4">in</h2>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-4 shadow-lg">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-yellow-900 font-bold text-lg">₪</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 md:ml-4">one place</h2>
          </div>
        </section>

        {/* Controlled Section */}
        <section className="py-16">
          <div className="flex items-center justify-center mb-8">
            <span className="text-lg font-medium text-purple-600 bg-gradient-to-r from-purple-200 to-purple-300 px-6 py-2 rounded-full shadow-sm">
              Control 100% of your coins activity in the dashboard
            </span>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 md:mr-4">Launch with  20 SOL Liquidity</h2>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-4 shadow-lg">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-yellow-900 font-bold text-lg">₪</span>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">Valuable Assets equal Proven Results</h2>

          <button className="bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-900 hover:to-purple-950 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mr-3 flex items-center justify-center">
              <span className="text-yellow-900 text-sm font-bold">₪</span>
            </div>
            CREATE MEMECOIN
          </button>
        </section>

        {/* Email Signup */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-4 left-4">
              <div className="w-8 h-8 bg-purple-400 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">TOTAL OF 1200 SOL AVAILABLE FOR LOAN, JOIN WAITLIST BELOW IF OUT OF STOCK</h3>
              <p className="text-purple-200 mb-8 max-w-md mx-auto text-sm md:text-base">
                Liquidity Launcher provides token deployment infrastructure only. By proceeding, you confirm understanding that blockchain assets carry risks and may be subject to regulation in your jurisdiction.
              </p>

              <div className="flex flex-col md:flex-row max-w-md mx-auto space-y-2 md:space-y-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-4 md:rounded-l-full rounded-full md:rounded-r-none text-purple-900 placeholder-purple-400 focus:outline-none"
                />
                <button className="bg-purple-900 hover:bg-purple-950 px-8 py-4 md:rounded-r-full rounded-full md:rounded-l-none font-medium transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-6">
            <a href="#" className="text-purple-600 hover:text-purple-800 flex items-center text-sm md:text-base">
              <span className="mr-1">𝕏</span> X.com
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800 flex items-center text-sm md:text-base">
              <span className="mr-1">⭐</span> Reviews
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800 flex items-center text-sm md:text-base">
              <span className="mr-1">⭐</span> Reviews
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800 flex items-center text-sm md:text-base">
              <span className="mr-1">📱</span> Telegram
            </a>
          </div>

          <div className="text-center text-purple-600">
            © 2023-2025
          </div>
        </div>
      </footer>
    </div>
  )
}