/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Title from '../../components/title/Title';
import { Membership, PagedMembership } from '../../types/api/membership';
import { membershipService } from '../../services/membership.service';
import TablePagination from '../../components/table/TablePaginate';
import { MembershipTable } from './MembershipTable';
import { EditField } from '../../components/inputs/edit/EditField';
import { membershipSchema } from '../../types/validations/membership.schema';
import { formatDisplayDate } from '../../shared/utils/dateFormater';
import { isDayLessThan11 } from '../../shared/utils/dateValidation';

const Memberships = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [membership, setMembership] = useState<PagedMembership>({} as PagedMembership);
  const [currentMembership, setCurrentMembership] = useState<Membership | null>(null);

  const fetch = async (
    currentPage: number = pagination.page,
    currentSize: number = pagination.size
  ) => {
    const data = await membershipService.getFilter('', currentPage - 1, currentSize);
    setMembership(data.historicMemberShipValues);
    setPagination({ page: currentPage, size: currentSize });
    setCurrentMembership(data.value);
  };

  const onSubmit = async (data: number) => {
    if (currentMembership) {
      await membershipService.put(currentMembership.id, { ...currentMembership, value: data });
      setCurrentMembership((prev) => {
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
      <Title text="Cuota Mensual" />

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2%' }}>
        {currentMembership && (
          <EditField<Membership>
            label="Cuota Actual"
            validationSchema={membershipSchema}
            onSubmit={(values) => onSubmit(values.value)}
            startDate={formatDisplayDate(currentMembership?.startDate)}
            currentValue={currentMembership}
            setCurrentValue={setCurrentMembership}
            canEdit={isDayLessThan11()}
          />
        )}
      </div>

      <Title text="Historial" variant="h4" />

      <MembershipTable data={membership?.content || []} />

      {membership?.totalElements > 0 && (
        <TablePagination
          pageCount={membership?.totalPages}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalElements={membership?.totalElements}
        />
      )}
    </>
  );
};

export default Memberships;
