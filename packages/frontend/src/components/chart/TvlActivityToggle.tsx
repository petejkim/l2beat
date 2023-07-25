import cx from 'classnames'
import React from 'react'

export function TvlActivityToggle({
  hasActivity,
  hasDetailedTvl,
}: {
  hasActivity: boolean
  hasDetailedTvl: boolean
}) {
  return (
    <div
      data-role="toggle-tvl-activity"
      className={cx(
        'relative',
        'before:absolute',
        'before:z-10',
        'before:-top-[1px]',
        'before:-left-[1px]',
        'before:-right-[1px]',
        'before:-bottom-[1px]',
        'before:bg-gradient-to-r',
        'before:from-purple-100',
        'before:to-pink-100',
        'before:rounded-md',
        'md:before:rounded-xl',
      )}
    >
      <label
        className={cx(
          'bg-purple-300 text-lg font-bold dark:bg-purple-700',
          'flex items-center p-[5px] md:p-[7px]',
          'cursor-pointer select-none rounded-[5px] md:rounded-[11px]',
          'relative z-20',
        )}
      >
        <input
          defaultChecked={true}
          id="tvl-activity-detailed"
          name="tvl-activity"
          type="radio"
          autoComplete="off"
          className="peer opacity-0"
          value="tvl"
        />
        {hasDetailedTvl && (
          <div
            className={cx(
              'flex-1 py-1 md:flex-auto md:px-6 md:py-1.5',
              'flex justify-center',
              'rounded md:rounded-md',
              'peer-checked:text-white',
              'peer-checked:bg-gradient-to-r',
              'peer-checked:from-purple-100',
              'peer-checked:to-pink-100',
            )}
          >
            Detailed TVL
          </div>
        )}
      </label>
      <label
        className={cx(
          'bg-purple-300 text-lg font-bold dark:bg-purple-700',
          'flex items-center p-[5px] md:p-[7px]',
          'cursor-pointer select-none rounded-[5px] md:rounded-[11px]',
          'relative z-20',
        )}
      >
        <input
          id="tvl-activity-tvl"
          defaultChecked={false}
          name="tvl-activity"
          type="radio"
          autoComplete="off"
          className="peer opacity-0"
          value="tvl"
        />
        <div
          className={cx(
            'flex-1 py-1 md:flex-auto md:px-6 md:py-1.5',
            'flex justify-center',
            'rounded md:rounded-md',
            'peer-checked:text-white',
            'peer-checked:bg-gradient-to-r',
            'peer-checked:from-purple-100',
            'peer-checked:to-pink-100',
          )}
        >
          <span className="hidden md:inline">Total Value Locked</span>
          <span className="md:hidden">TVL</span>
        </div>
      </label>
      <label
        className={cx(
          'bg-purple-300 text-lg font-bold dark:bg-purple-700',
          'flex items-center p-[5px] md:p-[7px]',
          'cursor-pointer select-none rounded-[5px] md:rounded-[11px]',
          'relative z-20',
        )}
      >
        <input
          id="tvl-activity-activity"
          name="tvl-activity"
          defaultChecked={false}
          type="radio"
          autoComplete="off"
          className="peer opacity-0"
          value="activity"
        />
        {hasActivity && (
          <div
            className={cx(
              'flex-1 py-1 md:flex-auto md:px-6 md:py-1.5',
              'flex justify-center',
              'rounded md:rounded-md',
              'peer-checked:text-white',
              'peer-checked:bg-gradient-to-r',
              'peer-checked:from-purple-100',
              'peer-checked:to-pink-100',
            )}
          >
            Activity
          </div>
        )}
      </label>
    </div>
  )
}
