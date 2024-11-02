import { FileText } from 'lucide-react';

export default function BannerPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-orange-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <FileText className="w-20 h-20 text-primary" />
          <h1 className="text-6xl font-bold">AI Resume Reviewer</h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl text-muted-foreground text-center max-w-2xl">
            Get instant, professional feedback on your resume with AI-powered
            analysis
          </p>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10">
              <span className="text-xl font-semibold">Smart Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10">
              <span className="text-xl font-semibold">Detailed Insights</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10">
              <span className="text-xl font-semibold">Actionable Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
