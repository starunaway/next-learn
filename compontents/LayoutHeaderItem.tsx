'use client';

import { usePathname, useRouter } from 'next/navigation';

import { classnames, spacing, sizing, typography } from 'tailwindcss-classnames';

interface Props {
  label: string;
  value: string;
}

export default (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={classnames(
        spacing('mr-4'),
        sizing('h-6'),
        typography(pathname.includes(props.value) ? 'text-cyan-600' : undefined)
      )}
      onClick={() => router.push(`${props.value}`)}
    >
      {props.label}
    </div>
  );
};
