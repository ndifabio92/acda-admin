/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Title from '../../components/title/Title';
import TablePagination from '../../components/table/TablePaginate';
import { EditField } from '../../components/inputs/edit/EditField';
import { formatDisplayDate } from '../../shared/utils/dateFormater';
import { SubscriptionTable } from './SubscriptionTable';
import { Subscription, PagedSubscription } from '../../types/api/subscription';
import { subscriptionSchema } from '../../types/validations/subscription.schema';
import { subscriptionService } from '../../services/subscription.service';
import { isDayLessThan11 } from '../../shared/utils/dateValidation';

const Subscriptions = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [subscription, setSubscription] = useState<PagedSubscription>({} as PagedSubscription);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  const fetch = async (
    currentPage: number = pagination.page,
    currentSize: number = pagination.size
  ) => {
    const data = await subscriptionService.getFilter('', currentPage - 1, currentSize);
    setSubscription(data.historicSubscriptionValues);
    setPagination({ page: currentPage, size: currentSize });
    setCurrentSubscription(data.value);
  };

  const onSubmit = async (data: number) => {
    if (currentSubscription) {
      await subscriptionService.put(currentSubscription.id, {
        ...currentSubscription,
        value: data,
      });
      setCurrentSubscription((prev) => {
        const updated = prev ? { ...prev, value: data } : null;
        return updated;
      });
    }
    await fetch();
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ page: 1, size: newPageSize });
  };

  useEffect(() => {
    fetch(pagination.page, pagination.size);
  }, [pagination.page, pagination.size]);

  return (
    <>
      <Title text="Suscripción Mensual" />

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2%' }}>
        {currentSubscription && (
          <EditField<Subscription>
            label="Suscripción Actual"
            validationSchema={subscriptionSchema}
            onSubmit={(values) => onSubmit(values.value)}
            startDate={formatDisplayDate(currentSubscription?.startDate)}
            currentValue={currentSubscription}
            setCurrentValue={setCurrentSubscription}
            canEdit={isDayLessThan11()}
          />
        )}
      </div>

      <Title text="Historial" variant="h4" />

      <SubscriptionTable data={subscription?.content || []} />

      {subscription?.totalElements > 0 && (
        <TablePagination
          pageCount={subscription?.totalPages}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalElements={subscription?.totalElements}
        />
      )}
    </>
  );
};

export default Subscriptions;
