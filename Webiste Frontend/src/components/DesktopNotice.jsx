import { Monitor, AlertCircle } from 'lucide-react'

export default function DesktopNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1625] p-4">
      <div className="max-w-md w-full p-6 rounded-lg bg-white/5 border border-purple-500/20 backdrop-blur-sm shadow-xl">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-purple-400 shrink-0" />
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-purple-100">
              Desktop Access Only
            </h2>
            <div className="flex items-center gap-2 text-purple-200/80">
              <Monitor className="h-[10rem] w-[10rem]" />
              <p>
                Scopeverse.ai is currently only available on desktop computers. Please open this website on your computer for the best experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}