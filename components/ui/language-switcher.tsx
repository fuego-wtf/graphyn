'use client'

import { Button } from './button'
import { Languages } from 'lucide-react'
import { useRouter } from 'next/navigation'

const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'tr', name: 'Türkçe' },
] as const

export function LanguageSwitcher() {
	const router = useRouter()

	const handleLanguageChange = (code: string) => {
		// For now, we'll just keep English as the only language
		console.log(`Language switching to ${code} is currently disabled`)
	}

	return (
		<div className="flex items-center gap-1.5">
			<Languages className="h-3.5 w-3.5 text-muted-foreground" />
			<div className="flex gap-0.5">
				{languages.map((lang) => (
					<Button
						key={lang.code}
						variant="ghost"
						size="sm"
						onClick={() => handleLanguageChange(lang.code)}
						className="px-1.5 text-xs"
					>
						{lang.code.toUpperCase()}
					</Button>
				))}
			</div>
		</div>
	)
}

