"use client"
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Sparkles, Twitter } from 'lucide-react';
import { motion } from "framer-motion";

export default function Footer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        // Handle newsletter submission
        console.log(data);
        reset();
    };

    const links = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Documentation', href: '/docs' },
            { name: 'Examples', href: '/examples' },
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'License', href: '/license' },
        ],
    };

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <motion.div 
                        className="col-span-2 md:col-span-1 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="shrink-0">
                                <div className="relative h-8 w-8">
                                    <div className="absolute inset-0 rounded-lg bg-primary/10" />
                                    <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-primary to-primary-foreground opacity-50" />
                                    <div className="absolute inset-1 rounded-md bg-background" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-3 w-3 rounded-sm bg-primary" />
                                    </div>
                                </div>
                            </Link>
                            <div className="flex gap-2">
                                <Link href="https://github.com/fuego-wtf" target="_blank">
                                    <Button variant="ghost" size="icon" className="p-2 rounded-md hover:bg-primary/10 hover:text-primary">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="https://twitter.com/fuegolabs_" target="_blank">
                                    <Button variant="ghost" size="icon" className="p-2 rounded-md hover:bg-primary/10 hover:text-primary">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            A product of <a href="https://fuego.wtf" target="_blank" className="text-primary hover:text-primary/90">Fuego Labs</a>. Build smarter AI solutions.
                        </p>
                    </motion.div>

                    {/* Links sections */}
                    <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-xs font-medium text-foreground">Product</h3>
                        <ul className="space-y-2">
                            {links.product.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xs font-medium text-foreground">Legal</h3>
                        <ul className="space-y-2">
                            {links.legal.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div 
                        className="col-span-2 md:col-span-1 space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-xs font-medium text-foreground">Stay Updated</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <Input
                                {...register('email', { required: true })}
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 text-sm rounded-md border-input bg-background"
                            />
                            <Button 
                                type="submit" 
                                className="w-full rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>

                <motion.div 
                    className="mt-8 pt-6 border-t border-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p className="text-xs text-muted-foreground text-center">
                        &copy; {new Date().getFullYear()} Graphyn by Fuego Labs. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

